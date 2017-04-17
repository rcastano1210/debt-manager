$(document).ready(function () {
  // respond to required mortgage inputs
  $(".loanAmount").on("change", function(e) { stopPropagation(e); processLoan(); });
  $(".loanInterestRate").on("change", function(e) { stopPropagation(e); processLoan(); });
  $(".mortgageStartDate").val(setMortgageStartDate());

  // new loan vs. current loan
  $(".newLoan").on("change", function(e) { stopPropagation(e); updateToNewLoan(); processLoan(); });
  $(".currentLoan").on("change", function(e) { stopPropagation(e); updateToCurrentLoan(); processLoan(); });

  // new loan
  $(".loanTime").on("change", function(e) { stopPropagation(e); processLoan(); });

  // current loan
  $(".currentPrincipal").on("change", function(e) { stopPropagation(e); processLoan(); });
  $(".currentInterest").on("change", function(e) { stopPropagation(e); processLoan(); });

  // respond to escrow checkboxes
  $(".addEscrow").on("change", function(e) { stopPropagation(e); toggleInput(".escrow"); processLoan(); });
  $(".addHomeInsurance").on("change", function(e) { stopPropagation(e); toggleInput(".homeInsurance"); processLoan(); });
  $(".addCountyTax").on("change", function(e) { stopPropagation(e); toggleInput(".countyTax"); processLoan(); });
  $(".addPmi").on("change", function(e) { stopPropagation(e); toggleInput(".pmi"); processLoan(); });

  // respond to escrow number inputs
  $(".homeInsurance").on("change", function(e) { stopPropagation(e); processLoan(); });
  $(".countyTax").on("change", function(e) { stopPropagation(e); processLoan(); });
  $(".pmi").on("change", function(e) { stopPropagation(e); processLoan(); });

  // respond to extra principal checkboxes
  $(".addExtraPrincipal").on("change", function(e) { stopPropagation(e); toggleInput(".extraPrincipal"); processLoan(); });
  $(".addExtraPrincipalOnce").on("change", function(e) { stopPropagation(e); toggleInput(".extraPrincipalOnce"); toggleInput(".extraPrincipalOnceDate"); processLoan(); });
  $(".addExtraPrincipalPerYear").on("change", function(e) { stopPropagation(e); toggleInput(".extraPrincipalPerYear"); toggleInput(".extraPrincipalPerYearDate"); processLoan(); });
  $(".addExtraPrincipalPerMonth").on("change", function(e) { stopPropagation(e); toggleInput(".extraPrincipalPerMonth"); toggleInput(".extraPrincipalPerMonthDate"); processLoan(); });

  // respond to extra principal number inputs
  $(".extraPrincipalOnce").on("change", function(e) { stopPropagation(e); processLoan(); });
  $(".extraPrincipalPerYear").on("change", function(e) { stopPropagation(e); processLoan(); });
  $(".extraPrincipalPerMonth").on("change", function(e) { stopPropagation(e); processLoan(); });

  $(".loanTime").change();
});

function updateToNewLoan() {
  // uncheck the current loan checkbox so the user can check it
  $(".currentLoan").prop("checked", false);

  // enable the current loan checkbox so the user can check it
  $(".currentLoan").prop("disabled", false);

  // disable the new loan checkbox
  $(".newLoan").prop("disabled", true);

  // disable the current principal and interest
  $(".currentPrincipal").prop("disabled", true);
  $(".currentInterest").prop("disabled", true);

  // enable the new loan time (years)
  $(".loanTime").prop("disabled", false);
}

function updateToCurrentLoan() {
  // uncheck the new loan checkbox so the user can check it
  $(".newLoan").prop("checked", false);

  // enable the new loan checkbox so the user can check it
  $(".newLoan").prop("disabled", false);

  // disable the current loan checkbox
  $(".currentLoan").prop("disabled", true);

  // disable the new loan time (years) and the current loan checkbox
  $(".loanTime").prop("disabled", true);

  // enable the current principal and interest
  $(".currentPrincipal").prop("disabled", false);
  $(".currentInterest").prop("disabled", false);
}

function setMortgageStartDate() {
  var date = new Date();

  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();

  if (month < 10) month = "0" + month;
  if (day < 10) day = "0" + day;

  return year + "-" + month + "-" + day;
}

function stopPropagation(e) {
  $("input, textarea").keyup(function(e) {
      e.stopPropagation();
  });
}

function toggleInput(input) {
  $(input).toggle();
}

function getMortgageInputs() {
  var mortgageInputs = [];
  mortgageInputs["amount"] = parseFloat( $(".loanAmount").val() );
  mortgageInputs["interestRate"] = parseFloat( $(".loanInterestRate").val() );

  mortgageInputs["newLoan"] = $(".newLoan").prop("checked");
  mortgageInputs["time"] = parseInt( $(".loanTime").val() );

  mortgageInputs["currentLoan"] = $(".currentLoan").prop("checked");
  mortgageInputs["currentPrincipal"] = parseFloat( $(".currentPrincipal").val() );
  mortgageInputs["currentInterest"] = parseFloat( $(".currentInterest").val() );

  return mortgageInputs;
}

function getEscrowInputs() {
  var escrowInputs = [];

  escrowInputs["addEscrow"] = false;
  escrowInputs["homeInsurance"] = false;
  escrowInputs["countyTax"] = false;
  escrowInputs["pmi"] = false;

  if($(".addEscrow").prop("checked")) {
    escrowInputs["addEscrow"] = true;
    if($(".addHomeInsurance").prop("checked")) {
      escrowInputs["homeInsurance"] = parseFloat( $(".homeInsurance").val() );
    }
    if($(".addCountyTax").prop("checked")) {
      escrowInputs["countyTax"] = parseFloat( $(".countyTax").val() );
    }
    if($(".addPmi").prop("checked")) {
      escrowInputs["pmi"] = parseFloat( $(".pmi").val() );
    }
  }

  return escrowInputs;
}

function getExtraPrincipalInputs() {
  var extraPrincipalInputs = [];

  extraPrincipalInputs["addExtraPrincipal"] = false;
  extraPrincipalInputs["extraPrincipalOnce"] = 0;
  extraPrincipalInputs["extraPrincipalPerYear"] = 0;
  extraPrincipalInputs["extraPrincipalPerMonth"] = 0;

  if($(".addExtraPrincipal").prop("checked")) {
    extraPrincipalInputs["addExtraPrincipal"] = true;
    if($(".addExtraPrincipalOnce").prop("checked")) {
      extraPrincipalInputs["extraPrincipalOnce"] = parseFloat( $(".extraPrincipalOnce").val() );
    }
    if($(".addExtraPrincipalPerYear").prop("checked")) {
      extraPrincipalInputs["extraPrincipalPerYear"] = parseFloat( $(".extraPrincipalPerYear").val() );
    }
    if($(".addExtraPrincipalPerMonth").prop("checked")) {
      extraPrincipalInputs["extraPrincipalPerMonth"] = parseFloat( $(".extraPrincipalPerMonth").val() );
    }
  }

  return extraPrincipalInputs;
}

function readyForAmortization() {
  mortgageInputs = getMortgageInputs();

  if(!mortgageInputs["amount"]) {
    console.log("need a loan amount...");
    return false;
  }

  if(!mortgageInputs["interestRate"]) {
    console.log("need a loan interest rate...");
    return false;
  }

  if(mortgageInputs["newLoan"]) {
    if(!mortgageInputs["time"]) {
      console.log("need a loan time...");
      return false;
    }
  } else {
    if(!mortgageInputs["currentPrincipal"]) {
      console.log("need a current loan principal...");
      return false;
    }

    if(!mortgageInputs["currentInterest"]) {
      console.log("need a current loan interest...");
      return false;
    }
  }

  return true;
}

function amortize(applyExtraPrincipal) {
  var mortgageInputs = getMortgageInputs();
  var principalInterest = 1000;
  var monthlyInterestRate = mortgageInputs["interestRate"] / 100.0 / 12.0;

  if(mortgageInputs["newLoan"]) {
    //       L[c(1 + c)^n]
    // P = -----------------
    //      [(1 + c)^n - 1]
    // P = fixed monthly payment
    // L = loan amount
    // n = loan length (in months)
    // c = monthly interest rate
    var loanMonths = mortgageInputs["time"] * 12;
    var numerator = mortgageInputs["amount"] * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, loanMonths));
    var denominator = Math.pow(1 + monthlyInterestRate, loanMonths) - 1;
    principalInterest = numerator / denominator;
  } else {
    principalInterest = mortgageInputs["currentPrincipal"] + mortgageInputs["currentInterest"];
  }

  var payments = [];
  payments["balance"] = [mortgageInputs["amount"]];
  payments["interest"] = [];
  payments["principal"] = [];
  payments["monthlyPayment"] = [];

  if (applyExtraPrincipal) {
    var extraPrincipalInputs = getExtraPrincipalInputs();
    payments["extraPrincipalOnce"] = [];
    payments["extraPrincipalPerYear"] = [];
    payments["extraPrincipalPerMonth"] = [];
  }
  payments["extraPrincipal"] = [];

  payments["homeInsurance"] = [0];
  payments["countyTax"] = [0];
  payments["pmi"] = [0];

  payments["monthIndex"] = [0];

  var escrowInputs = getEscrowInputs();
  if(escrowInputs["addEscrow"]) {
    if(escrowInputs["homeInsurance"]) {
      payments["homeInsurance"][0] = escrowInputs['homeInsurance'] / 12;
    }
    if(escrowInputs["countyTax"]) {
      payments["countyTax"][0] = escrowInputs['countyTax'] / 12;
    }
    if(escrowInputs["pmi"]) {
      payments["pmi"][0] = escrowInputs['pmi'] / 12;
    }
  }

  var paidOff = false;

  while(_.last(payments["balance"]) != 0) {
    if(payments["principal"].length > 400) {
      console.log("Infinite Loop...");
      break;
    }
    payments["interest"].push(_.last(payments["balance"]) * monthlyInterestRate);
    var requiredPrincipal = principalInterest - _.last(payments["interest"]);

    if (applyExtraPrincipal) {
      // extra principal once
      if(_.last(payments["monthIndex"]) == 1) {
        payments["extraPrincipalOnce"].push(extraPrincipalInputs['extraPrincipalOnce']);
      } else {
        payments["extraPrincipalOnce"].push(0);
      }

      // extra principal per year
      if(extraPrincipalInputs["extraPrincipalPerYear"] && _.last(payments["monthIndex"]) % 12 == 0) {
        payments["extraPrincipalPerYear"].push(extraPrincipalInputs['extraPrincipalPerYear']);
      } else {
        payments["extraPrincipalPerYear"].push(0);
      }

      // extra principal per month
      payments["extraPrincipalPerMonth"].push(extraPrincipalInputs['extraPrincipalPerMonth']);

      payments["extraPrincipal"].push(_.last(payments['extraPrincipalOnce']) + _.last(payments['extraPrincipalPerYear']) + _.last(payments['extraPrincipalPerMonth']));
    } else {
      payments["extraPrincipal"].push(0);
    }

    if (applyExtraPrincipal) {
      if(_.last(payments["balance"]) <= (requiredPrincipal + _.last(payments["extraPrincipal"]))) {
        payments["principal"].push(_.last(payments["balance"]));
        payments["balance"].push(0);
        paidOff = true;
      }
    } else {
      if(_.last(payments["balance"]) <= requiredPrincipal) {
        payments["principal"].push(_.last(payments["balance"]));
        payments["balance"].push(0);
        paidOff = true;
      }
    }

    if(!paidOff) {
      if(applyExtraPrincipal) {
        payments["principal"].push(requiredPrincipal + _.last(payments["extraPrincipal"]));
      } else {
        payments["principal"].push(requiredPrincipal);
      }
      payments["balance"].push(_.last(payments["balance"]) - _.last(payments["principal"]));
    }

    payments["homeInsurance"].push(_.last(payments["homeInsurance"]));
    payments["countyTax"].push(_.last(payments["countyTax"]));
    payments["pmi"].push(_.last(payments["pmi"]));
    payments["monthlyPayment"].push(principalInterest + _.last(payments["homeInsurance"]) + _.last(payments["countyTax"]) + _.last(payments["pmi"]));
    payments["monthIndex"].push(_.last(payments["monthIndex"]) + 1);
  }

  console.log(payments);

  return payments;
}

function createLine(name, color, data) {
  return {
    name: name,
    color: color,
    data: data
  }
}

function generateLines(amortization) {
  var lines = [
    // createLine("Balance", "#444444", amortization["balance"]),
    createLine("Monthly Payment", "#CCCCCC", amortization["monthlyPayment"]),
    createLine("Principal", '#00FF00', amortization["principal"]),
    createLine("Interest", '#FF0000', amortization["interest"])
  ];

  var escrowInputs = getEscrowInputs();
  if(escrowInputs["addEscrow"]) {
    if(escrowInputs["homeInsurance"]) {
      lines.push(createLine("Home Insurance", "#0000DD", amortization["homeInsurance"]));
    }
    if(escrowInputs["countyTax"]) {
      lines.push(createLine("County Tax", "#DD9900", amortization["countyTax"]));
    }
    if(escrowInputs["pmi"]) {
      lines.push(createLine("Private Mortgage Insurance", "#CCCC00", amortization["pmi"]));
    }
  }

  return lines;
}

function lineGraphConfig(series, yMax) {
  return {
    chart: {
      zoomType: 'x',
      height: 300
    },
    credits: {
      enabled: false // remove the highcharts logo
    },
    title: {
      text: 'Mortgage Illustrated',
    },
    subtitle: {
      text: document.ontouchstart === undefined ? 'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in',
    },
    tooltip: {
      enabled: true,
      formatter: function () {
        return '$' + parseFloat(this.y).toFixed(2);
      }
    },
    yAxis: {
      min: 0,
      // max: yMax,
      title: {
        text: 'Dollars'
      }
    },
    legend: {
      layout: 'vertical',
      align: 'right',
      verticalAlign: 'middle',
      borderWidth: 0
    },
    series: series
  }
}

function createPieSlice(name, total) {
  return {
    name: name,
    y: total
  }
}

function generatePieSlices(totals) {
  var lines = [
    createPieSlice("Interest", totals["interest"])
  ];

  if(totals["extraPrincipalOnce"] > 0 || totals["extraPrincipalPerYear"] > 0 || totals["extraPrincipalPerMonth"] > 0) {
    var extraPrincipalTotal = totals["extraPrincipalOnce"] + totals["extraPrincipalPerYear"] + totals["extraPrincipalPerMonth"];
    lines.push(createPieSlice("Principal", totals["principal"] - extraPrincipalTotal));
    lines.push(createPieSlice("Extra Principal", extraPrincipalTotal));
  } else {
    lines.push(createPieSlice("Principal", totals["principal"]));
  }

  if(totals["countyTax"] && totals["countyTax"] > 0) {
    lines.push(createPieSlice("County Tax", totals["countyTax"]));
  }
  if(totals["homeInsurance"] && totals["homeInsurance"] > 0) {
    lines.push(createPieSlice("Home Insurance", totals["homeInsurance"]));
  }
  if(totals["pmi"] && totals["pmi"] > 0) {
    lines.push(createPieSlice("Private Mortgage Insurance", totals["pmi"]));
  }

  return lines;
}

function pieGraphConfig(series) {
  return {
    chart: {
      plotBackgroundColor: null,
      plotBorderWidth: null,
      plotShadow: false,
      type: 'pie'
    },
    credits: {
      enabled: false // remove the highcharts logo
    },
    title: {
      text: 'Money Spent'
    },
    tooltip: {
      pointFormat: '{series.name}: ${point.y:,.2f} (<b>{point.percentage:.2f}%</b>)'
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: 'pointer',
        dataLabels: {
          enabled: true,
          format: '<b>{point.name}</b>: ${point.y:,.2f} ({point.percentage:.2f}%)',
          style: {
            color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
          }
        }
      }
    },
    series: [{
      name: "Brands",
      colorByPoint: true,
      data: series
    }]
  }
}

function calculateTotals(amortization) {
  totals = {};

  for(key in amortization) {
    sum = 0;
    for(i = 0; i < amortization[key].length; i++) {
      sum += amortization[key][i];
    }
    totals[key] = sum;
  }

  return totals;
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function illustrateMortgage() {
  delete $(".amortizeGraph");
  $('.amortizeGraph').replaceWith('<div class="amortizeGraph"></div>');

  delete $(".totalPaidGraph");
  $('.totalPaidGraph').replaceWith('<div class="totalPaidGraph"></div>');

  delete $(".amortizeExtraPrincipalGraph");
  $('.amortizeExtraPrincipalGraph').replaceWith('<div class="amortizeExtraPrincipalGraph"></div>');

  delete $(".totalExtraPrincipalPaidGraph");
  $('.totalExtraPrincipalPaidGraph').replaceWith('<div class="totalExtraPrincipalPaidGraph"></div>');

  delete $(".interestSaved");
  $('.interestSaved').replaceWith('<div class="interestSaved"></div>');

  delete $(".timeSaved");
  $('.timeSaved').replaceWith('<div class="timeSaved"></div>');

  Highcharts.setOptions({
    lang: {
      thousandsSep: ','
    }
  });

  amortization = amortize(false);
  var totalMonths = _.last(amortization["monthIndex"]);
  var lineGraph = lineGraphConfig( generateLines( amortization ), amortization["monthlyPayment"][0] );
  $('.amortizeGraph').highcharts(lineGraph);

  var totalPaid = calculateTotals(amortization);
  var pieGraph = pieGraphConfig( generatePieSlices(totalPaid) );
  $('.totalPaidGraph').highcharts(pieGraph);

  var extraPrincipalInputs = getExtraPrincipalInputs();
  if(extraPrincipalInputs["addExtraPrincipal"] && (extraPrincipalInputs["extraPrincipalOnce"] || extraPrincipalInputs["extraPrincipalPerYear"] || extraPrincipalInputs["extraPrincipalPerMonth"])) {
    amortizationExtraPrincipal = amortize(true);
    var totalMonthsWithExtraPrincipal = _.last(amortizationExtraPrincipal["monthIndex"])
    lineGraph = lineGraphConfig( generateLines( amortizationExtraPrincipal ), amortizationExtraPrincipal["monthlyPayment"][0] );
    $('.amortizeExtraPrincipalGraph').highcharts(lineGraph);

    totalPaidWithExtraPrincipal = calculateTotals(amortizationExtraPrincipal);
    pieGraph = pieGraphConfig( generatePieSlices(totalPaidWithExtraPrincipal) );
    $('.totalExtraPrincipalPaidGraph').highcharts(pieGraph);

    var monthsSaved = totalMonths - totalMonthsWithExtraPrincipal;
    var years = Math.floor(monthsSaved / 12);
    var months = monthsSaved % 12;
    $('.timeSaved').text("Time Saved: " + String(years) + " years " + String(months) + " months");
    $('.interestSaved').text("Interest Saved: $" + String(numberWithCommas((totalPaid["interest"] - totalPaidWithExtraPrincipal["interest"]).toFixed(2))));
  }
}

function processLoan() {
  if(readyForAmortization()) {
    illustrateMortgage();
  }
}