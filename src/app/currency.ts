export class CoefficientList{
    oppositeCurrency: string;
    oppositeCoefficient: number;
    constructor(oppositeCurrency: string, oppositeCoefficient: number){
        this.oppositeCurrency = oppositeCurrency;
        this.oppositeCoefficient = oppositeCoefficient;
    }

}

export class Currency {
    public constructor(
        public code: string,
        public coefficients: CoefficientList[],
    ) {        
    }
}