package com.example.Entities;



import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;

    @Column(name = "user_name" , nullable = false)
    private String userName;

    @Column(name = "user_email" ,  nullable = false , unique = true)
    private String userEmail;

    @Column(name = "user_password" , nullable = false)
    private String userPassword;

    @Column(name = "user_phone_number" , nullable=true, unique = true)
    private String userPhoneNumber;

    @Embedded
    private Address userAddress;
    
    //this col for seller only and null for user
    //one product will only be sold by a particular seller
    @OneToMany(mappedBy = "productSeller", cascade = CascadeType.ALL)
    private List<Product> sellerProducts = new ArrayList<Product>();
    
    
    // user will have a cart and order column too
    // order item will have a isDelivered tag which will decide if products will be fetched in order history or in current orders
    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL)
    private Cart userCart;
    
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> userOrders = new ArrayList<>();

    

	@Enumerated(EnumType.STRING)
    @Column(name = "user_type" , nullable = true)
    private UserType  userType;

	public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(String userName, String userEmail, String userPassword, String userPhoneNumber, Address userAddress,
			List<Product> sellerProducts, Cart userCart, List<Order> userOrders, UserType userType) {
		super();
		this.userName = userName;
		this.userEmail = userEmail;
		this.userPassword = userPassword;
		this.userPhoneNumber = userPhoneNumber;
		this.userAddress = userAddress;
		this.sellerProducts = sellerProducts;
		this.userCart = userCart;
		this.userOrders = userOrders;
		this.userType = userType;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserEmail() {
		return userEmail;
	}

	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}

	public String getUserPassword() {
		return userPassword;
	}

	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}

	public String getUserPhoneNumber() {
		return userPhoneNumber;
	}

	public void setUserPhoneNumber(String userPhoneNumber) {
		this.userPhoneNumber = userPhoneNumber;
	}

	public Address getUserAddress() {
		return userAddress;
	}

	public void setUserAddress(Address userAddress) {
		this.userAddress = userAddress;
	}

	public List<Product> getSellerProducts() {
		return sellerProducts;
	}

	public void setSellerProducts(List<Product> sellerProducts) {
		this.sellerProducts = sellerProducts;
	}

	public Cart getUserCart() {
		return userCart;
	}

	public void setUserCart(Cart userCart) {
		this.userCart = userCart;
	}

	public List<Order> getUserOrders() {
		return userOrders;
	}

	public void setUserOrders(List<Order> userOrders) {
		this.userOrders = userOrders;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}

	
	
	

    
}