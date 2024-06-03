# Ecommerce-Website

It is an e-commerce website that provides a simple user interface to shop plants.

It offers the functionality to scroll through the available products, add products to a cart, and update their quantity later. The items are stored in the cart for each user. Once the order 
is confirmed the order information is displayed on the order page and if the user wants to view order details they can view it by clicking on the specific order. 

It also caters to the admin entity who can add new and unique products or delete the existing products from the firebase using the user interface.

It uses the following:

React - for front-end and code implementation
Firebase - to store data at the backend (Products and Orders)
Redux - to maintain the add, delete, and update functionality for the cart and make it available throughout the code
Local Storage - to directly set the user and its mode i.e. admin or customer
Tailwind - for overall styling
Ant Design -  for AntHome page styling
Protected Routing - for security purposes
Formik - to handle the form functionality

**Application Flow:**

Home Page: 
Shows the products in the store and allows the user to Add to/Update Cart.

Add to Cart: If the product does not already exist in the cart it allows the user to select the desired quantity and add it to the cart

Update Cart: Once the user has added the product to the cart the Update Cart button with a different color is rendered instead for Perceived Affordance for a user to provide a better UX experience. 
The user can select the additional quantity and update the cart.

![HomePage](https://github.com/bismaashar246/Ecommerce-Website/blob/main/home.png)

Ant Design Home Page:

It implements the same functionality but with ant design and uses the following custom designs:
- Card
- Meta
- Button
(Icons)
- PlusOutlined
- MinusOutlined,
- ShoppingCartOutlined,
- DeleteOutlined

![AntHome](https://github.com/bismaashar246/Ecommerce-Website/blob/main/home%20with%20ant%20design.png)

My Cart:
Once the product is added, it is reflected in the cart for the relevant user along with the product name, product image, product cost, product quantity, and total price. Major product 
information is displayed so the user does not have to navigate to the home page to know about the product which reduces the user's cognitive load.

User can:
- increase or decrease the product quantity here.
- delete the product from the cart
- confirm the order

![My Cart](https://github.com/bismaashar246/Ecommerce-Website/blob/main/my%20cart.png)

My Orders:
This shows all the orders for the user along with the unique order id, total cost, and the time when the order was placed. To view the order details you can click on the order and navigate to its page.

![MyOrders](https://github.com/bismaashar246/Ecommerce-Website/blob/main/my%20orders%20list.png)

Order Details
It fetches the product details along with the quantity that is ordered under that particular order.

![OrderDetails](https://github.com/bismaashar246/Ecommerce-Website/blob/main/specific%20order%20details.png)

Admin Home Page:
Admin HomePage provides the functionality to delete the products from the Firebase by clicking on the Delete button.

Admin can also add new products through the Product form 
- The URL check is added so it needs to be a proper URL as well as a unique URL if it already exists in the Firebase user cannot add it to ensure no duplicate product is added to the Firebase
- Note that the name is not kept unique because there can be more than one type of plant under the same name. However, against each product, a unique Product ID is generated in the Firebase

![Admin Home Page](https://github.com/bismaashar246/Ecommerce-Website/blob/main/admin%20home.png)


Infinite Scroll:

Infinite scroll is implemented using IntersectionObserver. On fetchInitialProducts, the initial batch of products is fetched and displayed. When the user scrolls down and the already existing 
products from the batch are fetched that means the target intersects the viewport then the next batch is fetched using fetchMoreProducts which then keeps occurring infinitely.
Note: A view is attached to show this functionality.


**My Work Flow:**

1. Project Set up with all installations
2. Created files hierarchy and folders
3. Installed prettier: https://prettier.io/docs/en/install.html
4. Installed tailwindcss for UI: https://tailwindcss.com/docs/installation
5. Made the UI for all pages
6. Created a simple project that displays the data that is stored in a file using a Pictures file
7. Integrated firebase: https://console.firebase.google.com/u/1/project/e-comm-site-246
8. Created a Firestore
https://www.freecodecamp.org/news/how-to-use-the-firebase-database-in-react/
9. Fetched and saved data using Firestore
10. Implemented Debouncing on Search
https://www.freecodecamp.org/news/debouncing-explained/
11. Added redux for handling cart at client side
12. Added more than one user and saved user info in local storage
13. Solved errors
> Resolved the serializable value error
https://stackoverflow.com/questions/70852386/a-non-serializable-value-was-detected-in-an-action-in-the-path-register-val

> faced a component rerendering error
used callback to resolve it in the search bar functionality (Home.js / Admin.js)

14. Added protected routing
12. Converted forms to Formik

13. Integrated the suggested changes
- infinite scroll on the home page ()
https://www.educative.io/answers/how-to-implement-infinite-scrolling-with-reactjs
- url check (done added in AddProductForm.js)
- add/ decrease on product card (done added in ProductCard.js)
- product card ant design
