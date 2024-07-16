package com.example.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Entities.CartProduct;

import jakarta.transaction.Transactional;

@Repository
public interface CartProductRepository extends JpaRepository<CartProduct, Integer> {
	
	@Query("SELECT cp FROM CartProduct cp WHERE cp.product.productId = :productId")
	public Optional<CartProduct> findByProductId(@Param("productId") int productId);
	
	@Transactional
	@Modifying
	@Query("DELETE FROM CartProduct cp WHERE cp.cart.user.userId = :userId AND cp.product.productId = :productId")
	public void deleteCartProduct(@Param("userId") int userId, @Param("productId") int cartItemId);
	
	@Query("select cp from CartProduct cp where cp.cart= :cartId")
	public Optional<CartProduct> findByCartId(@Param("cartId") int cartId);

}
