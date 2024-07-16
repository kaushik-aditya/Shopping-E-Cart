package com.example.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Entities.Cart;
import com.example.Entities.CartProduct;
import com.example.Entities.Order;
import com.example.Entities.OrderProduct;
import com.example.Entities.User;
import com.example.Repository.CartRepository;
import com.example.Repository.OrderProductRepository;
import com.example.Repository.OrderRepository;
import com.example.Repository.UserRepository;

@Service
public class OrderProductService {
	@Autowired
	private OrderProductRepository orderProductRepo;
	@Autowired
	private OrderRepository orderRepo;
	
	@Autowired
	private CartRepository cartRepo;
	@Autowired
	private UserRepository userRepo;
	
	// order the product and return order summary
	// Create order history API
	public List<OrderProduct> orderTheCartProducts(int userId) {
		Optional<User> user = userRepo.findById(userId);

		// if for the id , there is no cart alloted.
		Optional<Cart> userCart = cartRepo.findByUserId(userId);
		if(userCart.isEmpty()) return null;
				
		// if cart has no products
		if(userCart.get().getCartProducts()==null) return null;
		
		List<CartProduct> userCartProducts = userCart.get().getCartProducts();
		List<OrderProduct> orderedProductList = new ArrayList<OrderProduct>();
	

		Order newOrder = new Order(user.get());
	    orderRepo.save(newOrder);
	            
			// now we will fill cartProduct in orderedProducts
		for(CartProduct pro : userCartProducts) {
			OrderProduct orderedProduct = new OrderProduct();
			orderedProduct.setDelivered(false);
			orderedProduct.setProduct(pro.getProduct());
			orderedProduct.setOrder(newOrder);
			orderedProduct.setQuantity(pro.getQuantity());
			
			orderedProductList.add(orderedProduct);
			orderProductRepo.save(orderedProduct);
		}
		newOrder.setOrderedProducts(orderedProductList);
		newOrder.setUser(user.get());
		
		// saving the order in order table
		orderRepo.save(newOrder);
		
		// saving the orders in user table
		List<Order> userOrderList = user.get().getUserOrders();
		userOrderList.add(newOrder);
		user.get().setUserOrders(userOrderList);
		userRepo.save(user.get());
		
		// return the orderProductList
		return orderedProductList;
	}
	
	//Get Order History API
	public List<OrderProduct> getUserOrderHistory(int userId){
//		Optional<User> user = userRepo.findById(userId);
		Optional<List<Order>> userOrder = orderRepo.findByUserId(userId);

		if(userOrder.isEmpty()) return null;
		List<OrderProduct> orderHistoryList = new ArrayList<OrderProduct>();
		for(Order orders : userOrder.get()) {
			List<OrderProduct> orderedProductInTheOrder = orders.getOrderedProducts();
			for(OrderProduct ordered : orderedProductInTheOrder) {
				orderHistoryList.add(ordered);
			}
		}
		return orderHistoryList;
	}
}
