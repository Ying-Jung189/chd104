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
        showCartDetails()
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

    //點購物車icon
    $('.addToCart').click(function(event){
        //阻止父層預設的<a>跳轉
        event.preventDefault()

        const selectedAmount = 1
        const productName = $(this).closest('.card').find('.productName').text()
        const priceString = $(this).closest('.card').find('.price').text()
        const productPrice = parseInt(priceString.slice(-2))//無法有3位數的數字
        addToCart(productName, productPrice, selectedAmount)
    })

    // 加入購物車按鈕
    $('#add-cart').click(function(){
        const selectedAmount = parseInt($('#buy-number').val())
        //const productName = $(this).parent().parent().children('.title').children('.productName').text()
        //若只有頁面一個class名，可用document尋找
        const productName = $(document).find('.productName').text()
        const priceString = $(document).find('.price').text()
        const productPrice = parseInt(priceString.slice(-2))
        addToCart(productName, productPrice, selectedAmount)
    })

    //購物車滑進
    $('#shop-cart').click(function(){
        $('.cart').css("right", "0")
        showCartDetails()
    })
    //購物車滑出
    $('.cart-close').click(function(){
        $('.cart').css("right", "-40vw")
    })


    // 清除單項產品，click只能用在本身存在的物件
    $(document).on('click', '.delete', function() {
        const productName = $(this).parent().parent().find('.productName').text() // 獲取要刪除的商品名稱
    
        // 從 sessionStorage 中獲取購物車資訊
        const storedShoppingCart = JSON.parse(sessionStorage.getItem('shoppingCart')) 
        const deleteItem = storedShoppingCart.items.filter(item => item.productName == productName)
        const deleteQuantity = deleteItem[0].quantity
        updateCartQuantity(-deleteQuantity)
    
        // 找到要刪除的商品並從購物車中刪除
        let updatedItems = storedShoppingCart.items.filter(item => item.productName !== productName)

        // 更新購物車資訊
        const updatedShoppingCart = {
            items: updatedItems,
            buyAmount: storedShoppingCart.buyAmount - deleteQuantity  // 更新購物車的商品數量
        }
        // 更新 shoppingCart 變數的值
        shoppingCart = updatedShoppingCart
        // 更新 sessionStorage 中的資料
        sessionStorage.setItem('shoppingCart', JSON.stringify(shoppingCart))

        // 若無商品刪除結帳按鈕
        if (shoppingCart.buyAmount == 0) {
            $('.addCart-btn').remove()
        }
        console.log(shoppingCart.buyAmount)
            

        // 重新顯示購物車資訊
        showCartDetails()
    })

    //檢查按鈕是否添加
    let payAdded = false

    // 購物車資訊顯示函數//innerHTML
    function showCartDetails() {
        $('.productList').empty()
        if (shoppingCart.items.length !== 0) {
            let totalPrice = 0
            shoppingCart.items.forEach(item => {
                const subtotal = item.price * item.quantity
                totalPrice += subtotal
                const subTotalPrice = $('<div></div>').addClass('subTotalPrice')
                const pricedel = $('<div></div>').addClass('pricedel')
                const productDetail = $('<div></div>').addClass('productDetail')
                const eachProduct= $('<div></div>').addClass('eachProduct')
                productDetail.append(
                    $('<h5></h5>').text(item.productName).addClass('productName'),
                    $('<div></div>').addClass('productprice').append(
                        $('<span></span>').text(item.quantity + 'X').addClass('quantity'),
                        $('<p></p>').text('NT$' + item.price)
                    )
                )
                pricedel.append(
                    subTotalPrice.append(
                        $('<span></span>').text('NT$' +subtotal)
                    ),
                    $('<i class="fa-solid fa-trash-can"></i>').addClass('delete')
                )
                eachProduct.append(
                    productDetail,
                    pricedel,
                )
                $('.productList').append(eachProduct)
            })

            $('.productList').append(
                $('<div></div>').addClass('priceSection').append(
                    $('<h4></h4>').text('總計').addClass('totalText'),
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


