import { Component } from '@angular/core';
import { CoefficientList, Currency } from './currency';
import { HttpService } from './http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  

  public firstSelectedCurrency: string = "UAH";
  public secondSelectedCurrency: string = "UAH";
  public firstValue: string  = "1.00";
  public secondValue: string  = "1.00";
  public currencyList: Currency[] | undefined = [];


  constructor(private httpService: HttpService){}

  ngOnInit(): void {
    this.httpService.getData().subscribe((data: any) => {
      this.currencyList = [
        new Currency("UAH", [
            new CoefficientList("UAH", 1), 
            new CoefficientList("USD", data[0]['UAH_USD']),
            new CoefficientList("EUR", data[0]['UAH_EUR']) 
        ]),
        new Currency("USD", [
            new CoefficientList("USD", 1), 
            new CoefficientList("EUR", data[1]['USD_EUR']),
            new CoefficientList("UAH", data[1]['USD_UAH'])
        ]),
        new Currency("EUR", [
            new CoefficientList("EUR", 1), 
            new CoefficientList("UAH", data[2]['EUR_UAH']),
            new CoefficientList("USD", data[2]['EUR_USD'])
        ])
      ];
    });
  }


  findCoefficient(fromCurrency: string, toCurrency: string){
      let selectedCurrency =  this.currencyList?.find((currency: Currency) => currency.code === fromCurrency);
      let selectedCoeffObj = selectedCurrency?.coefficients.find((coefficient: CoefficientList) => coefficient.oppositeCurrency === toCurrency);
      let selectedCoefficient = selectedCoeffObj?.oppositeCoefficient;
      return selectedCoefficient;
  }

  findResult(inputValue: any, coefficient: any ){
    let result: any = inputValue * coefficient;
    isNaN(result) ? result = "0.00" : result = result.toFixed(2);
    return result;
  }


}
