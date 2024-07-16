package com.example.Services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Entities.Cart;
import com.example.Entities.CartProduct;
import com.example.Entities.Product;
import com.example.Entities.User;
import com.example.Repository.CartProductRepository;
import com.example.Repository.CartRepository;
import com.example.Repository.ProductRepository;
import com.example.Repository.UserRepository;

@Service
public class CartProductService {
	@Autowired
	private CartProductRepository cartProRepo;
	@Autowired
	private UserRepository userRepo;
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private CartRepository cartRepo;

	// API for getting cart product and its quantity
	public CartProduct getCartItemById(int cartItemid) {
		Optional<CartProduct> currentCartProduct = cartProRepo.findById(cartItemid);
		if (currentCartProduct.isPresent()) {
			return currentCartProduct.get();
		} else
			return null;
	}

	// API to add cart Product
	public CartProduct addProductInCart(int userId, int productID) {

		Optional<CartProduct> currentProduct = cartProRepo.findByProductId(productID);

		// if product already exists ..quantity will be increased
		if (currentProduct.isPresent()) {
			currentProduct.get().setQuantity(currentProduct.get().getQuantity() + 1);
			
			return cartProRepo.save(currentProduct.get());
		}
		// if product does not exist
		else {
			Optional<User> user = userRepo.findById(userId);
			Optional<Cart> userCart = cartRepo.findByUserId(userId);
			Optional<Product> product = productRepo.findById(productID);
			
			// if userCart is empty is empty, create a new one
			if (userCart.isEmpty()) {
				Cart newCart = new Cart(user.get());
				userCart = Optional.of(newCart);
				cartRepo.save(userCart.get());
			}
			if (user.isEmpty() || product.isEmpty())
				return null; // add PRODUCT NOT FOUND EXCEPTION
			else {
				// creating a new cart product set quantity to 1 and assign cart id and product id
				CartProduct newCartProduct = new CartProduct();
				newCartProduct.setProduct(product.get());
				newCartProduct.setCart(userCart.get());
				newCartProduct.setQuantity(1);

				//saving the cartProduct in table 
				newCartProduct = cartProRepo.save(newCartProduct);
				
				// assigining the cartProduct to cart and updating the cart
				Cart cart = userCart.get();
				List<CartProduct> currentCartProductsInCart = cart.getCartProducts();
				currentCartProductsInCart.add(newCartProduct);
				cart.setCartProducts(currentCartProductsInCart);
				
				cartRepo.save(cart);
				
				// returning the product added in response
				return newCartProduct;

				

			}
		}
	}
	//API to delete product from cart
	public void removeProductFromCart(int userId, int cartItemId) {
		cartProRepo.deleteCartProduct(userId, cartItemId);
	}
	
	
	// API to change quantity 
	public CartProduct increaseProductQuantity(int productId, int userId) {
		Optional<CartProduct> currentProductOptional = cartProRepo.findById(productId);
		if(currentProductOptional.isEmpty()) return null; // add exception handling
		
		else {
			CartProduct currentProduct = currentProductOptional.get();
			currentProduct.setQuantity(currentProduct.getQuantity()+1);
			return cartProRepo.save(currentProductOptional.get());
		}
	}
	
	// APi to decrease quantity
	public CartProduct decreaseProductQuantity(int productId, int userId) {
		Optional<CartProduct> currentProductOptional = cartProRepo.findById(productId);
		if(currentProductOptional.isEmpty()) return null; // add exception handling
		
		else {
			CartProduct currentProduct = currentProductOptional.get();
			if(currentProduct.getQuantity()==1) {
				cartProRepo.delete(currentProduct);
				return null;
			}
			else {
				currentProduct.setQuantity(currentProduct.getQuantity()-1);
				return cartProRepo.save(currentProductOptional.get());

			}
		}
	}
}
