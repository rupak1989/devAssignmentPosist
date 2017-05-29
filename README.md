# Developer Assignment-POSist
To run this app -
1: Get Clone of repositary ()
2: cd devAssignmentPosist
3: run npm install in terminal
4: run 'npm start' to start and then open 'http://127.0.0.1:8081/customers' in your browser


#RequireMent
1) Build a single page app for insertion,deletion and updation of the customer collection.
2) There should be an option to filter customer data by name,mobile,phone,DOB and address.
3) Edit functionality should be integrated with the same form meant for the insertion of customer
data.
4) There should be Pagination for showing the customer records.
5) There should be validation of the require fields.
Data Structure for the Customer Collection:
_id:ObjectId
Name :String
Mobile:String
Phone :String
Addresses:[] (Flat,Street,State ,Pin Code)// provision for adding dynamically multi addresses
DOB:Date
Email:String
6) Write a script and insert thousands of the record for Bills.
Data Structure for the Bill Collection:
_id:ObjectId
BillNumber: Number(auto incremental)
BillDate:DateTime
Items:[] (name:String,quantity:Number,Rate:Decimal) //Dynamic ally generate 1 to 10 items for
each bill.)
Discount:Number (in precent)
Tax :Number (in Percent)
CustomerId: _id of Customer Collection// Select _id randomly from existing Customer
Collection.
7) Create a customer report in the following format.
Customer
Mobile
Phone
Email
Name
Abc
--
--
--
NoOfBills Amount
-- --
Avg
Amount
--
Amount : Consolidated amount of bills associated with the customer.
Avg Amount: Amount/NoOfBills
Calculation of Amount Of Each Bill: sum of Rate*Quantity of Each Bill –discount amount +Tax
amountDiscount Amount = sum of Rate*Quantity *Discount/100
Tax Amount = DiscountAmount*Tax/100
