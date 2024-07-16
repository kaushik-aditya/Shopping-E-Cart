//package com.example.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//import  org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import com.example.Entities.Product;
//
//@Repository
//public interface ProductRepository extends JpaRepository<Product, Integer>{
//	
//	// Product By category API
//	@Query("SELECT e FROM Product e WHERE e.productCategory = :category")
//    public Optional<List<Product>> findByCategory(@Param("category") String category);
//
//	@Query("SELECT p FROM Product p JOIN p.tags t WHERE t LIKE %:keyword%")
//    List<Product> findByTagsKeyword(@Param("keyword") String keyword);
//	
//	
//	@Query("select p from Product  p where p.productSubCategory = :subCategory and p.productBrand =: brand and p.price >= :minPrice AND p.price <= :maxPrice")
//    List<Product> findByFilterTags(@Param("subCategory") String productSubcategory, @Param("brand") String Brand, @Param("minPrice") double minPrice,
//    									@Param("maxPrice") double maxPrice);
//
//	
//	
////	@Query("SELECT e FROM Product e WHERE e.prductName = :name AND e.productBrand = :brand AND e.productCategory = :category")
////	public Optional<Product> findByNameBrandAndCategory(@Param("name") String name , @Param("brand") String brand , @Param("category") String category );
////	
//	/*
//	 * @Query() public List<Product> findBySearchString(@Param("searchKey") String
//	 * searchKey);
//	 */
//	
//	
//}
package com.example.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Entities.Product;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    
    @Query("SELECT e FROM Product e WHERE e.productCategory = :category")
    Optional<List<Product>> findByCategory(@Param("category") String category);

    @Query("SELECT p FROM Product p JOIN p.tags t WHERE t LIKE %:keyword%")
    List<Product> findByTagsKeyword(@Param("keyword") String keyword);

    @Query("SELECT p FROM Product p WHERE p.productSubCategory = :subCategory AND p.productBrand = :brand AND p.productPrice >= :minPrice AND p.productPrice <= :maxPrice")
    List<Product> findByFilterTags(@Param("subCategory") String productSubcategory, @Param("brand") String brand, @Param("minPrice") double minPrice,
                                    @Param("maxPrice") double maxPrice);

    // You can add more query methods as needed.

}

