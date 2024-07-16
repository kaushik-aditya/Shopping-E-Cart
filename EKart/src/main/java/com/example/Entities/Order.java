package com.example.Entities;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "orders")
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private int orderId;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

//	@ManyToMany
//	@JoinTable(name = "ordered_product", joinColumns = @JoinColumn(name = "order_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
//	private List<OrderProduct> orderedProducts = new ArrayList<>();
	
	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
	@Column(name =  "order_product_id")
	List<OrderProduct> orderedProducts ;

	// checks whether the added product in order table is delivered or not
//	@Column(name = "Delivered?")
//	private boolean isDelivered;

	public Order() {
		super();
	}

	public Order(User user) {
		super();
		this.user = user;
	}

	public Order(User user, List<OrderProduct> orderedProducts, boolean isDelivered) {
		super();
		this.user = user;
		this.orderedProducts = orderedProducts;
		// this.isDelivered = isDelivered;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public List<OrderProduct> getOrderedProducts() {
		return orderedProducts;
	}

	public void setOrderedProducts(List<OrderProduct> orderedProducts) {
		this.orderedProducts = orderedProducts;
		
	}

//	public boolean isDelivered() {
//		return isDelivered;
//	}
//
//	public void setDelivered(boolean isDelivered) {
//		this.isDelivered = isDelivered;
//	}
	
	

}
