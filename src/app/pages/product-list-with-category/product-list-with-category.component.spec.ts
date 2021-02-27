import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductListWithCategoryComponent } from './product-list-with-category.component';

describe('ProductListWithCategoryComponent', () => {
  let component: ProductListWithCategoryComponent;
  let fixture: ComponentFixture<ProductListWithCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductListWithCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListWithCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
