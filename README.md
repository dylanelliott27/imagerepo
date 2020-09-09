# imagerepo

This is an image repository web application which offers the following features:

* Store/upload multiple images.
* User account system/registration system.
* Monetary system/purchasing/selling images.
* Editing/updating/listing/unlisting images for sale.
# How to use 
Navigate to http://imagerepo.dylanelliott.ca/ ... or clone the repository and load the build index.html/run the index.js with Node & execute the SQL file into a running MySQL server.

Register an account quickly (if you would wish) or use the placeholder test account: 
  * username: test
  * password: test

## Marketplace 
Upon successful registration/login you should be redirected to the main homepage/marketplace. Here you will be able to see all of the images that each user has chosen to publicly list for sale. 

You will be able to see your current funds in the top right of the navbar. You may PURCHASE a image in the marketplace, and it will be moved over to the "my images" tab. Upon purchase, the funds will be deducted from your account and be reflected in the navbar. The previous owner of the image will then RECEIVE said funds.

## My Images
Here you will be able to see all of the images either uploaded by you, or purchased by you. You have the option to both delete, or edit the image/image details. On delete, it will remove the image entirely from the server, as well as the marketplace and your images tab.

On edit, you may change the price of the image, as well as choose to list is as NON public, thusfor removing it from the marketplace, but keeping it in your images tab.

## Upload
The uploader has multiple files enabled. Upon selection of file(s), a preview will appear beneath the uploader, with text input fields for 
  * Price
  * Public
  * Tags
The tags field accepts comma seperated values, however as of right now, there is no usage for the tags. Soon to be implemented will be a search feature in the marketplace.
