package com.example.Entities;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_id")
	private int productId;

	@Column(name = "name", nullable = false, unique = true)
	private String productName;

	@Column(name = "price", nullable = false)
	private Double productPrice;

	@Column(name = "brand", nullable = false)
	private String productBrand;

	@Column(name = "details")
	private String productDetails;

	@Column(name = "category", nullable = false)
	private String productCategory;

	@Column(name = "subCategory")
	private String productSubCategory;

	// this col will decide who is the seller of the product
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User productSeller;

	@ElementCollection
	@CollectionTable(name = "product_tags", joinColumns = @JoinColumn(name = "product_id"))
	private List<String> tags = new ArrayList<String>();
	
	
	public Product() {
		super();
	}

	public Product(String productName, Double productPrice, String productBrand, String productDetails,
			String productCategory, String productSubCategory, User productSeller) {
		super();
		this.productName = productName;
		this.productPrice = productPrice;
		this.productBrand = productBrand;
		this.productDetails = productDetails;
		this.productCategory = productCategory;
		this.productSubCategory = productSubCategory;
		this.productSeller = productSeller;
		// Adding brand,name, price,category ,subcategory ,sellerName to the tags for search keyword
		this.tags.add(productSubCategory);
		this.tags.add(productBrand);
		this.tags.add(productName);
		this.tags.add(productCategory);
		this.tags.add(productPrice.toString());
		this.tags.add(productSeller.getUserName());
	
		
	};

	public List<String> getTags() {
		return tags;
	}


	public int getProductId() {
		return productId;
	}

	public void setProductId(int productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}
	
	
	// when we are setting a new field , we are adding them to the tagKList too.
	
	
	public void setProductName(String productName) {
		if(this.productName!=null) this.tags.remove(this.productName);
		this.productName = productName;
		this.tags.add(productName);
	}

	public Double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(Double productPrice) {
		if(this.productPrice!=null) this.tags.remove(this.productPrice.toString());
		this.productPrice = productPrice;
		this.tags.add(productPrice.toString());
	}

	public String getProductBrand() {
		return productBrand;
	}

	public void setProductBrand(String productBrand) {
		if(this.productBrand!=null) this.tags.remove(this.productBrand);
		this.productBrand = productBrand;
		this.tags.add(productBrand);
	}

	public String getProductDetails() {
		return productDetails;
	}

	public void setProductDetails(String productDetails) {
		this.productDetails = productDetails;
	}

	public String getProductCategory() {
		return productCategory;
	}

	public void setProductCategory(String productCategory) {
		if(this.productCategory!=null) this.tags.remove(this.productCategory);
		this.productCategory = productCategory;
		this.tags.add(productCategory);
	}

	public String getProductSubCategory() {
		return productSubCategory;
	}

	public void setProductSubCategory(String productSubCategory) {
		if(this.productSubCategory!=null)  this.tags.remove(this.productSubCategory);
		this.productSubCategory = productSubCategory;
		this.tags.add(productSubCategory);
	}

	public User getProductSeller() {
		return productSeller;
	}

	public void setProductSeller(User productSeller) {
		if(this.productSeller!=null) this.tags.remove(this.productSeller.getUserName());
		this.productSeller = productSeller;
		this.tags.add(this.productSeller.getUserName());
	}

}