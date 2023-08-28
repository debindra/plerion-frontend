const baseUrl = process.env.REACT_APP_API_BASE_URL;

export const getAllProducts = async () => {
    const res = await fetch(`${baseUrl}/products`);
    return res.json();
  };

export const saveProduct = async (payload) => {
    const res = await fetch(`${baseUrl}/products`, {
      method: 'POST', 
      body: JSON.stringify(payload)
    });
    return res.json();
  }

  export const deleteProduct = async (productId) => {
    const res = await fetch(`${baseUrl}/products/${productId}`,{
      method: 'DELETE', 
    })
    return res.json()
  }
  
  