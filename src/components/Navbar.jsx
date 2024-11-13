import { Button, Input, Modal } from 'antd';
import React, { useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductsCard from './ProductCard';

function Navbar({ products, setProducts, refresh, setRefresh }) {
	const dispatch = useDispatch();
	const likedProducts = useSelector(state => state.likedList);
	const [closeModal, setCloseModal] = useState(false);

	// Liked mahsulotlar narxining yig'indisini hisoblash
	const totalLikedPrice = useMemo(() => {
		return likedProducts.reduce((total, item) => total + item.price, 0);
	}, [likedProducts]);

	function handleDeleteProduct(item) {
		const updatedItem = { ...item, isLiked: !item.isLiked };
		const updatedList = products.map(value =>
			value.id === item.id ? updatedItem : value
		);
		setProducts(updatedList);
		dispatch(handleDeleteProduct(updatedItem));
	}

	function handleInputSearch(e) {
		const filteredData = products.filter(item =>
			item.title.toLowerCase().includes(e.target.value.toLowerCase())
		);
		setProducts(filteredData);
		if (!e.target.value) {
			setRefresh(!refresh);
		}
	}

	return (
		<nav className='p-5 bg-blue-500 flex items-center justify-between'>
			<h1 className="text-bold text-[30px] leading-[25px] text-white">Products</h1>
			<div className="flex items-center space-x-5">
				<Input
					onChange={handleInputSearch}
					className='w-[300px]'
					size='large'
					placeholder='Searching...'
					allowClear
					autoComplete='off'
				/>
				<Button
					onClick={() => setCloseModal(true)}
					className='bg-transparent hover:!bg-transparent text-white hover:!text-white border-white hover:!border-white text-[20px] font-medium leading-[20px]'
					size='large'
				>
					Like ({likedProducts.length}) - Taxminiy narx: ${totalLikedPrice}
				</Button>
			</div>
			<Modal
				className='!w-full !inset-0 !h-full'
				open={closeModal}
				onCancel={() => setCloseModal(false)}
				onOk={() => setCloseModal(false)}
			>
				<div className="w-full flex items-center gap-5 overflow-x-auto mt-10">
					{likedProducts.map(item => (
						<ProductsCard
							item={item}
							width={250}
							key={item.id}
							handleDeleteProduct={handleDeleteProduct}
							extraClass={'min-w-[250px]'}
							isDelete={true}
						/>
					))}
				</div>
			</Modal>
		</nav>
	);
}

export default Navbar;
