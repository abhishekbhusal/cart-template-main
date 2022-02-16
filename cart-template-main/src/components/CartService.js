const url="http://localhost:8080/api/users";
export const saveUsers = (user) => {
    return fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        "method": 'POST',
        body: JSON.stringify(user)

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}

export const loginUser= (user) => {
    return fetch(`${url}/login`, {
        headers: { 'Content-Type': 'application/json' },
        "method": 'POST',
        body: JSON.stringify(user)

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}

export const authenticate=()=>{
    if(typeof window ==="undefined") return false;
    if(localStorage.getItem("userInfo")){
        return JSON.parse(localStorage.getItem("userInfo"));
    }
    return false;
}

export const getAllUser= () => {
    return fetch(url, {
        headers: { 'Content-Type': 'application/json' },
        "method": 'GET',
        

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}

export const getUser= (id) => {
    return fetch(`${url}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        "method": 'GET',
        

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}


export const deleteUser= (id) => {
    return fetch(`${url}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        "method": 'DELETE',
        

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}

export const updateUser= (user,id) => {
    user.password='nnnn';
    return fetch(`${url}/${id}`, {
        headers: { 'Content-Type': 'application/json' },
        "method": 'PUT',
        body:JSON.stringify(user)
        

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}


export const saveProduct = (products,token) => {
    return fetch('http://localhost:8080/api/v1/products', {
        headers: { 
            'Content-Type': 'application/json' ,
        "Authorization":`Bearer ${token}`
     },
        "method": 'POST',
        body: JSON.stringify(products)

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
   
}
export const getAllProduct= (token) => {
    return fetch('http://localhost:8080/api/v1/products', {
        headers: { 'Content-Type': 'application/json' , "Authorization":`Bearer ${token}`},
        "method": 'GET',
        

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}
export const deleteProduct= (token,id) => {
    return fetch(`http://localhost:8080/api/v1/products/${id}`, {
        headers: { 'Content-Type': 'application/json' ,"Authorization":`Bearer ${token}`},
        "method": 'DELETE',
       
        

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}

export const updateProduct= (product,id,token) => {
    return fetch(`http://localhost:8080/api/v1/products/${id}`, {
        headers: { 'Content-Type': 'application/json', "Authorization":`Bearer ${token}` },
        "method": 'PUT',
        body:JSON.stringify(product)
        

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}

export const getAllCategory=(token)=>{
     return fetch('http://localhost:8080/api/categories',
      {
        headers: {
            'Content-Type': 'application/json' ,
        "Authorization":`Bearer ${token}`
     },
        "method": 'GET'
       

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })

}

export const saveCategory = (categories,token) => {
    return fetch('http://localhost:8080/api/categories', {
        headers: { 
            'Content-Type': 'application/json' ,
        "Authorization":`Bearer ${token}`
     },
        "method": 'POST',
        body: JSON.stringify(categories)

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
   
}
export const deleteCategory= (id,token) => {
    return fetch(`http://localhost:8080/api/categories/${id}`, {
        headers: { 'Content-Type': 'application/json',
        "Authorization":`Bearer ${token}` },
        "method": 'DELETE',
        

    }).then(res => {
        return res.json();
    }
    ).catch(err => {
        console.log(err)
    })
}