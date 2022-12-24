import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemEduComponent } from './item-edu.component';

describe('ItemEduComponent', () => {
  let component: ItemEduComponent;
  let fixture: ComponentFixture<ItemEduComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemEduComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemEduComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
