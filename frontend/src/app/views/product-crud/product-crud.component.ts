import { HeaderService } from './../../components/template/header/header.service';
import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { Product } from 'src/app/components/product/product.model';
import { ProductService } from 'src/app/components/product/product.service';

@Component({
  selector: 'app-product-crud',
  templateUrl: './product-crud.component.html',
  styleUrls: ['./product-crud.component.css']
})
export class ProductCrudComponent implements OnInit {

  products: Product = {
    id: '',
    name: '',
    price: 0
  }

  constructor(private router: Router,
    private headerService: HeaderService,
    private productService: ProductService) { 
    headerService.headerData = {
      title: 'Cadastro de Produtos',
      icon: 'storefront',
      routeUrl: '/products'
    }
  }

  ngOnInit(): void {
  }

  navigateToProductCreate(): void {
    this.router.navigate(['/products/create'])
  }

  Search(): void{
   console.log('products!: Product[]; ',this.products.name)
   var teste = this.productService.search(this.products.name, this.products.price).subscribe(products => {
    console.log('busca', products);
  })
  
    console.log('teste', teste)
  }

  CleanFields():void{
    this.products.name = '';
    this.products.price = 0;
  }
}
