
import React from 'react'
import"./../../App.css";
function Item({item,onDeleteClick }) {
    // console.log(item)
    const handleOnClick = (e, itemId)=> {
        e.preventDefault();
        alert(itemId)
        onDeleteClick(itemId)
    }
  return (
    <>
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img src={item.imageUrl || item.image_url} alt={item.name} width={40} height={40} className='productImage'  />
                    {/* //TODO: Image should be thumbnail image(from s3 bucket) instead of url image */}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {item.productName}
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                   $ {item.price}
                </td>
                <td className="px-6 py-4">
                   {item.description}
                </td>
                <td className="px-6 py-4">
                    <a href="#" onClick={(e)=>handleOnClick(e, item.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</a>
                </td>
            </tr>
    </>
  )
}

export default Item