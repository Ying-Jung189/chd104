//加入購物車
$(document).ready(function(){

    function updateCartQuantity(amount = 0) {
        shoppingCart.buyAmount += amount
        if (shoppingCart.buyAmount === 0) {
            $('.cart-num').hide()

        } else {
            $('.cart-num').show().text(shoppingCart.buyAmount)
        }
        sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

    }
    // 為了處理多個商品，將商品資訊存儲為陣列
    let shoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart')) || { items: [], buyAmount: 0 }

    
    function addToCart(productName, price, quantity) {
        const existingItemIndex = shoppingCart.items.findIndex(item => item.productName === productName)
        if (existingItemIndex !== -1) {
            const existingItem = shoppingCart.items[existingItemIndex]
            existingItem.quantity += quantity
            updateCartQuantity(quantity)
        } else {
            shoppingCart.items.push({ productName, price, quantity })
            updateCartQuantity(quantity)
        }
        // 將更新後的 shoppingCart 物件保存到 sessionStorage 中
        sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    }

    //其他頁讀取資料
    let storedShoppingCart = sessionStorage.getItem('shoppingCart')
    if (storedShoppingCart) {
        shoppingCart = JSON.parse(storedShoppingCart)

        //更新header
        if (shoppingCart.buyAmount === 0) {
            $('.cart-num').hide()
    
        } else {
            $('.cart-num').show().text(shoppingCart.buyAmount)
        }

    }

    // //顯示在header並加入sessionStorage
    // function addBuyData(){
    //     //擷取價格
    //     productPrice = parseInt(priceString.slice(-2))
    //     if( shoppingCart.buyAmount !== 0){
    //         shoppingCart.productName = productName
    //         shoppingCart.price =  productPrice
    //     }
    //     $('.cart-num').show()
    //     $('.cart-num').text(shoppingCart.buyAmount)
    //     //更新數值到sessionStorage中
    //     sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))
    // }

    //點購物車icon
    $('.addToCart').click(function(event){
        //阻止父層預設的<a>跳轉
        event.preventDefault()

        const selectedAmount = 1
        const productName = $(this).closest('.card').find('.productName').text()
        const priceString = $(this).closest('.card').find('.price').text()
        const productPrice = parseInt(priceString.slice(-2))
        addToCart(productName, productPrice, selectedAmount)
    })

    // 加入購物車按鈕
    $('#add-cart').click(function(){
        const selectedAmount = parseInt($('#buy-number').val())
        const productName = $(this).parent().parent().children('.title').children('.productName').text()
        const priceString = $(this).parent().parent().children('.price-amount').children('.price').text()
        const productPrice = parseInt(priceString.slice(-2))
        addToCart(productName, productPrice, selectedAmount)
    })
    //點加入購物車按鈕
    // $('#add-cart').click(function(){
    //     let selectedAmount = parseInt($('#buy-number').val())
    //     // 將新選擇的數量加到購物車中原有的數量上
        
    //     shoppingCart.buyAmount = (shoppingCart.buyAmount ? parseInt(shoppingCart.buyAmount) : 0) + selectedAmount
    //     productName = $('.productName').text()
    //     priceString = $('.price').text()

    //     addBuyData()
    // })


    //購物車滑進
    $('#shop-cart').click(function(){
        $('.cart').css("right", "0")
        showCartDetails()
    })
    //購物車滑出
    $('.cart-close').click(function(){
        $('.cart').css("right", "-40vw")
    })

    // //清除單項產品，click只能用在本身存在的物件
    // $(document).on('click', '.delete', function() {
    //     const $productDetail = $(this).closest('.productDetail') // 找到與點擊的按鈕相關聯的商品元素
    //     const productName = $productDetail.find('h5').text() // 獲取商品名稱
    //     const itemQuantity = parseInt($productDetail.find('.quantity').text()) // 獲取商品數量

    //     sessionStorage.()
    //     //header數字清除
    //     updateCartQuantity(-itemQuantity)
    //     showCartDetails()
    // })

    // 清除單項產品，click只能用在本身存在的物件
    $(document).on('click', '.delete', function() {
        const productName = $(this).parent().children().children('.productName').text() // 獲取要刪除的商品名稱
    
        // 從 sessionStorage 中獲取購物車資訊
        const storedShoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart')) 
        const deleteItem = storedShoppingCart.items.filter(item => item.productName == productName)
        const deleteQuantity = deleteItem[0].quantity
        updateCartQuantity(-deleteQuantity)
    
        // 找到要刪除的商品並從購物車中刪除
        let updatedItems = storedShoppingCart.items.filter(item => item.productName !== productName)

    
        // 將購物車的商品數量設置為 0
        let updatedTotalQuantity = 0
    
        // 如果還有其他商品，則重新計算購物車的商品數量
        if (updatedItems.length > 0) {
            updatedTotalQuantity = updatedItems.reduce((total, item) => total + item.quantity, 0)
        }else{
            $('.addCart-btn').remove()
        }
    
        // 更新購物車資訊
        const updatedShoppingCart = {
            items: updatedItems,
            buyAmount: updatedTotalQuantity  // 更新購物車的商品數量
        }
        // 更新 shoppingCart 變數的值
        shoppingCart = updatedShoppingCart
        // 更新 sessionStorage 中的資料
        sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

        // 重新顯示購物車資訊
        showCartDetails()
    })

    //檢查按鈕是否添加
    let payAdded = false

    // 購物車資訊顯示函數
    function showCartDetails() {
        $('.productList').empty()
        if (shoppingCart.items.length !== 0) {
            let totalPrice = 0
            shoppingCart.items.forEach(item => {
                const subtotal = item.price * item.quantity
                totalPrice += subtotal
                const productDetail = $('<div></div>').addClass('productDetail')
                const eachProduct= $('<div></div>').addClass('eachProduct')
                productDetail.append(
                    $('<h5></h5>').text(item.productName).addClass('productName'),
                    $('<div></div>').addClass('productprice').append(
                        $('<span></span>').text(item.quantity + 'X').addClass('.quantity'),
                        $('<p></p>').text('NT$' + item.price)
                    )
                )
                eachProduct.append(
                    productDetail,
                    $('<i class="fa-solid fa-trash-can"></i>').addClass('delete')
                )
                $('.productList').append(eachProduct)
            })

            $('.productList').append(
                $('<div></div>').addClass('priceSection').append(
                    $('<h4></h4>').text('小計').addClass('subtotal'),
                    $('<h3></h3>').text('NT$' + totalPrice).addClass('total'),
                )
            )

            if (!payAdded) {
                const pay = $('<a></a>').text('結帳').addClass('addCart-btn').attr('href','#')
                $('.cart').append(pay)
                payAdded = true
            }
        } else {
            $('.productList').append('<p>購物車內無任何商品</p>').addClass('noProduct')
            payAdded = false
        }
    }
})   


