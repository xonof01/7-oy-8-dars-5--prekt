import React, { useEffect, useCallback } from 'react';
import ProductCard from './ProductCard';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { saveLikedProducts } from '../store/LikedSlice';

function List({ products, setProducts, refresh }) {
	const dispatch = useDispatch();

	const fetchProducts = useCallback(async () => {
		try {
			const response = await axios.get('https://dummyjson.com/products');
			const updatedProducts = response.data.products.map(item => ({
				...item,
				isLiked: false,
			}));
			setProducts(updatedProducts);
		} catch (error) {
			console.error('Failed to fetch products:', error);
		}
	}, [setProducts]);

	useEffect(() => {
		fetchProducts();
	}, [fetchProducts, refresh]);

	const handleLikedBtnClick = useCallback(
		item => {
			const updatedItem = { ...item, isLiked: !item.isLiked };
			const updatedList = products.map(product =>
				product.id === item.id ? updatedItem : product
			);
			setProducts(updatedList);
			dispatch(saveLikedProducts(updatedItem));
		},
		[products, dispatch, setProducts]
	);

	return (
		<div className='p-5 flex flex-wrap justify-between gap-[25px]'>
			{products.map(item => (
				<ProductCard
					item={item}
					handleLikedBtnClick={handleLikedBtnClick}
					key={item.id}
					width={300}
				/>
			))}
		</div>
	);
}

export default List;