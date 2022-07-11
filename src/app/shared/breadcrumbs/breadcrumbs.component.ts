import { filter, map } from 'rxjs/operators';
import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [],
})
export class BreadcrumbsComponent implements OnDestroy{
  public title: string;
  public tituloSubs$: Subscription;

  constructor(private router: Router) {
    this.tituloSubs$ = this.getDataRouter()
                      .subscribe(({ titulo }) => {
                        this.title = titulo;
                        document.title = `AdminPro - ${titulo}`;
                      });
    this.getDataRouter();
  }


  ngOnDestroy(): void {
   
    this.tituloSubs$.unsubscribe();
    
  }

  getDataRouter() {
    return this.router.events.pipe(
      filter((event) => event instanceof ActivationEnd),
      filter((event: ActivationEnd) => event.snapshot.firstChild === null),
      map((event: ActivationEnd) => event.snapshot.data)
    );
  }
}
