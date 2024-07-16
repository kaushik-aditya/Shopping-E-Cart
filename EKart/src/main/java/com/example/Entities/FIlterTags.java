package com.example.Entities;

public class FIlterTags {
	
	
	private String brand;
	private String subCategory;
	private String maxPrice;
	private String minPrice;
	
	public FIlterTags() {
		super();
	}

	public FIlterTags(String name, String brand, String category, String subCategory, String maxPrice, String minPrice) {
		super();
		this.brand = brand;
		this.subCategory = subCategory;
		this.maxPrice = maxPrice;
		this.minPrice = minPrice;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	public String getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(String maxPrice) {
		this.maxPrice = maxPrice;
	}

	public String getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(String minPrice) {
		this.minPrice = minPrice;
	}

	
	
}
