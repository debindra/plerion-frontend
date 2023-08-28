import Item from '../Molecules/Item'

function Product({products, onDelClick}) {
 
  // const onClickHandler = (id)=> {
  //   alert('id')
  //   alert(id)
  //   onDelClick(id)
  // }

  return (
    <>
    <div className="bg-gray-100 relative mt-1 overflow-x-auto shadow-md sm:rounded-lg">
    
    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                  <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Item
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Description
                  </th>
                  <th scope="col" className="px-6 py-3">
                      Action
                  </th>
              </tr>
          </thead>
          <tbody>
  
            {products.length>0?products.map(product =>(
              <Item item={product} key={product.productId} onDeleteClick={onDelClick} />)
            ):
            (
              <tr > 
                <td colSpan={4}>
                <p className='text-center'>There is no data to display.</p>
                </td>
              </tr>
            )
            }
  
          </tbody>
      </table> 
      </div>
    </>
  )
}

export default Product