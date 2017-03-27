from debt.models import Mortgage

class MortgageUtils(object):
    @staticmethod
    def add_mortgage(principal_balance, interest_rate,
                     name, description,
                     mortgage_insurance, home_insurance, property_tax):
        mortgage = Mortgage.objects.create(
            principal_balance=principal_balance,
            interest_rate=interest_rate,
            name=name,
            description=description,
            mortgage_insurance=mortgage_insurance,
            home_insurance=home_insurance,
            property_tax=property_tax,
        )
        mortgage.save()