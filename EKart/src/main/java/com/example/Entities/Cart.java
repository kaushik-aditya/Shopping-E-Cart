package com.example.Entities;

import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "carts")
public class Cart {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cart_id")
	private int cartId;

	@OneToOne
	@JoinColumn(name = "user_id")
	private User user;

//	@ManyToMany
//	@JoinTable(name = "cart_product", joinColumns = @JoinColumn(name = "cart_id"), inverseJoinColumns = @JoinColumn(name = "product_id"))
//	private List<Product> cartProducts = new ArrayList<Product>();
	
	@OneToMany(mappedBy = "cart", cascade = CascadeType.ALL)
	@Column(name =  "cart_product_id")
	List<CartProduct> cartProducts ;

	public Cart() {
		// Default constructor
	}

	public Cart(User user) {
		this.user = user;
	}

	public Cart(User user, List<CartProduct> products) {
		super();
		this.user = user;
		this.cartProducts = products;
	}

	public int getCartId() {
		return cartId;
	}

	public List<CartProduct> getCartProducts() {
		return cartProducts;
	}

	public void setCartProducts(List<CartProduct> cartProducts) {
		this.cartProducts = cartProducts;
	}

	public void setCartId(int cartId) {
		this.cartId = cartId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	
}
