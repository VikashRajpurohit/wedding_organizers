import React from 'react'
import { Link } from 'react-router-dom'

const Services = () => {
  return (
    <>
    <section class="services py-5">
	<div class="container py-md-5">
		<h3 class="heading text-capitalize mb-lg-5 mb-4"> Our Services </h3>
		<div class="row service-grids">
			<div class="col-lg-3 col-sm-6">
				<div class="service-grid1">
					<span class="fa fa-globe"></span>
					<h4 class="my-3">Weddings</h4>
					<p>Aenean tristique, duiid sedet blandit elt ultricies, ligula elit interd ures turpis, at bibendum lib dolor.</p>
				</div>
			</div>
			<div class="col-lg-3 col-sm-6 mt-sm-0 mt-sm-4 mt-4" >
				<div class="service-grid1">
					<span class="fa fa-book"></span>
					<h4 class="my-3">Parties</h4>
					<p>Aenean tristique, duiid sedet blandit elt ultricies, ligula elit interd ures turpis, at bibendum lib dolor.</p>				
				</div>
			</div>
			<div class="col-lg-3 col-sm-6 mt-lg-0 mt-sm-4 mt-4">
				<div class="service-grid1">
					<span class="fa fa-diamond"></span>
					<h4 class="my-3">Entertainment</h4>
					<p>Aenean tristique, duiid sedet blandit elt ultricies, ligula elit interd ures turpis, at bibendum lib dolor.</p>
				</div>
			</div>
			<div class="col-lg-3 col-sm-6 mt-lg-0 mt-sm-4 mt-4">
				<div class="service-grid1">
					<span class="fa fa-book"></span>
					<h4 class="my-3">Celebrations</h4>
					<p>Aenean tristique, duiid sedet blandit elt ultricies, ligula elit interd ures turpis, at bibendum lib dolor.</p>				
				</div>
			</div>
			<div class="ser-button mt-4">
				<Link to="services">Explore all services</Link>
			</div>
		</div>
	</div>
</section>

<section class="subscribe text-center bg-light py-5">
	<div class="container p-sm-3">
		<h3 class="heading mb-2"> Subscribe Newsletter </h3>
		<p class="mb-5">Signup and recieve 15% on your First Plan.</p>
		<form action="#" method="post">
			<input class="form-control" type="email" placeholder="Your Email Address" name="Subscribe" required="" />
			<button class="btn1">
				<span class="fa fa-paper-plane"></span>
			</button>
		</form>
	</div>
</section>


    </>
  )
}

export default Services