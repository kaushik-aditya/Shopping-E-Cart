package com.example.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.Entities.FIlterTags;
import com.example.Entities.Product;
import com.example.Entities.User;
import com.example.Repository.ProductRepository;
import com.example.Repository.UserRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
	@Autowired
	private ProductRepository productRepo;
	@Autowired
	private UserRepository userRepo;

	// Get Product API
	public Product getExistingProduct(int id) {
		if (productRepo.findById(id) != null) {
			return productRepo.findById(id).get();
		} else {
			throw new RuntimeException("Product not found with ID: " + id);
		}
	}

	// Modifying product API
	public Product updateAndRegisterExistingProduct(Product product,String sellerEmail) {
		Optional<User> sellerOfProduct = userRepo.findByUserEmail(sellerEmail);
		if(sellerOfProduct.isEmpty()) return null;
		Optional<Product> optionalProduct = productRepo.findById(product.getProductId());
		List<Product> sellersProductList = sellerOfProduct.get().getSellerProducts();
		
		// if seller has no existong product,,it should return null
		if(sellersProductList.isEmpty()) return null;
		
		if (optionalProduct.isPresent()) {
			Product oldProduct = optionalProduct.get();
			
			// remove old product from user table and save changes
			sellersProductList.remove(oldProduct);
			sellerOfProduct.get().setSellerProducts(sellersProductList);
			userRepo.save(sellerOfProduct.get());
			
			//updating old product
			oldProduct.setProductBrand(product.getProductBrand());
			oldProduct.setProductCategory(product.getProductCategory());
			oldProduct.setProductDetails(product.getProductDetails());
			oldProduct.setProductName(product.getProductName());
			oldProduct.setProductPrice(product.getProductPrice());
			oldProduct.setProductSubCategory(product.getProductSubCategory());
			
			// savint the updated project in projects table
			Product updatedProduct = productRepo.save(oldProduct);
			
			//commiting changes in user table
			sellersProductList.add(updatedProduct);
			sellerOfProduct.get().setSellerProducts(sellersProductList);
			
			userRepo.save(sellerOfProduct.get());
			
			return updatedProduct;

			
		} else {

			throw new RuntimeException("Product not found with ID: " + product.getProductId());
		}
	}

	// Output all products from a table
	public List<Product> getAllProducts() {
		return productRepo.findAll();
	}

	// Add product API
	public Product addAndRegisterNewProduct(Product newProduct, String sellerEmail) {
		try{
			Optional<User> sellerOfProduct = userRepo.findByUserEmail(sellerEmail);
			if(sellerOfProduct.isEmpty()) return null;
			Product registeredProduct = productRepo.save(newProduct);
			
			// saving the newProduct in user where type is seller
			List<Product> sellersProductList = sellerOfProduct.get().getSellerProducts();
			sellersProductList.add(registeredProduct);
			sellerOfProduct.get().setSellerProducts(sellersProductList);
			
			userRepo.save(sellerOfProduct.get());
			
			
			return registeredProduct;			
			
		}catch(RuntimeException e) {
			e.printStackTrace();
		}
		return null;
		
	}

	// Products By category API
	public List<Product> getProductsByCategory(String category) {
		Optional<List<Product>> categorizedProduct = productRepo.findByCategory(category);
		if(categorizedProduct!=null) return categorizedProduct.get();
		else return null;
	}

	// Product By Search String API
	public List<Product> findProductsByKeyword(String keyword) {
        return productRepo.findByTagsKeyword("%" + keyword + "%");
		
    }

	public List<Product> findProductsByFilterTags(FIlterTags tags){
		String productSubcategory  = tags.getBrand() ;
		String productBrand  = tags.getBrand() ;
		double maxPrice = Double.parseDouble(tags.getMaxPrice());
		double minPrice = Double.parseDouble(tags.getMinPrice());
		
		List<Product> filteredProducts = productRepo.findByFilterTags(productSubcategory, productBrand, minPrice, maxPrice);
		return filteredProducts;
					
	}
	
	
	
	

}
