package com.example.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.Entities.OrderProduct;

public interface OrderProductRepository extends JpaRepository<OrderProduct, Integer> {
	
}
