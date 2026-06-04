public with sharing class RazorpayPaymentController {

    @AuraEnabled
    public static Decimal getOrderAmount(Id orderId) {

        try {

            Order__c ord = [
                SELECT Id, Amount__c
                FROM Order__c
                WHERE Id = :orderId
                LIMIT 1
            ];

            if (ord.Amount__c == null) {

                throw new AuraHandledException(
                    'Order amount is not set.'
                );
            }

            return ord.Amount__c;

        } catch (Exception e) {

            throw new AuraHandledException(
                'Unable to fetch amount: ' + e.getMessage()
            );
        }
    }

    @AuraEnabled
    public static void updatePaymentStatus(
        Id orderId,
        String paymentId
    ) {

        try {

            Order__c ord = [
                SELECT Id,
                       Amount__c
                FROM Order__c
                WHERE Id = :orderId
                LIMIT 1
            ];

            ord.Payment_Status__c = 'Paid';

            ord.Payment_ID__c = paymentId;

            ord.Payment_Amount__c = ord.Amount__c;

            ord.Payment_Date__c = System.now();

            update ord;

        } catch (Exception e) {

            throw new AuraHandledException(
                'Unable to update payment: '
                + e.getMessage()
            );
        }
    }
}