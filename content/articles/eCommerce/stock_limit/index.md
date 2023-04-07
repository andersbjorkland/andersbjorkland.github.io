+++
title = "Stock Limits? No Problem! Adding Some Pizzazz to your Sylius Storefront"
date = 2023-04-07
weight = 1
description = "Learn how to add a Stock Limit to your Sylius Storefront with this article! Enhance your inventory with Sylius’ flexibility and malleability"
+++

{{ articleHeader(
path='articles/eCommerce/stock_limit/hero.jpeg'
title='Stock Limits? No Problem!'
subtitle='Adding Some Pizzazz to your Sylius Storefront'
) }}  
  
Are you missing a stock limit in your Sylius storefront? Say no more! In this article, we’ll show you how to add a Stock Limit to your Sylius Storefront with ease. With Sylius’ flexibility and malleability, you can enhance your inventory in ways you never thought possible. And who knows? You might even have some fun along the way 😉.  
  
## How it starts
The 'Track' button is Sylius’ trusty sidekick to keep your inventory in check with. With it you can ensure that you only sell what is in your stock.  

So what is it? It’s Sylius’ inventory feature! With this feature, you can set how many items are available for each product variant you have. By setting 'Track' on it, Sylius will add a validation check when a customer wants to add that item to their cart. This way, you will never sell more than what you have. But is it enough?
  
Sometimes, you just need a little extra something to feel like a true eCommerce mogul. Perhaps you don't want to sell all the items in stock, but keep some in store for later. Such a neat buffer-feature would be truly great to have. As this does not come out-of-the box for us, we will make it ourselves!

To reach our aim to feel like that eCommerce mogul we all strive to be, here is what we will do:
* Create a `StockLimitInterface`
* Implement the interface on `ProductVariant` and add a `stockLimit` field
* Update the UI for setting the limit
* Create an `AvailabilityCheckerDecorator`

{% quoter() %}I shop therefore I am. It’s like Descartes but with more bags.{% end %}

{{ imager_standard(asset='articles/eCommerce/stock_limit/swan-with-bag1.png', alt='Swagger UI, but no resources available', class='center') }}

### Our aim 
By the end of this article, you’ll be able to take advantage of our new, fresh-from-the-press, feature: individual stock limits for each product variant. With this feature, you’ll be able to set limits on how many of each product variant can be added to a cart. You’ll also be able to see when a product variant has less than the limit in stock. This new feature is perfect for businesses that want to manage their inventory more effectively and avoid overselling products. So let’s dive in and see how it all works!
