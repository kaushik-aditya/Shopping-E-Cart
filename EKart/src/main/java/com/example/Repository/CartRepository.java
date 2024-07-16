package com.example.Repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.Entities.Cart;


@Repository
public interface CartRepository extends JpaRepository<Cart, Integer> {

	// find the cart corresponding to a given user id
	@Query("SELECT c FROM Cart c WHERE c.user.userId = :userId")
	public Optional<Cart> findByUserId(@Param("userId") int userId);

//	@Transactional
//	@Modifying
//	@Query("DELETE FROM Cart c WHERE c.user.userId = :userId AND c.cartProducts.productId = :productId")
//	void deleteCartProduct(@Param("userId") int userId, @Param("productId") int cartItemId);

}
