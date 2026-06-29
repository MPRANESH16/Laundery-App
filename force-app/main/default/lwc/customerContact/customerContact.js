import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class CustomerContact extends LightningElement {

    handleSuccess(event){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Customer Contact created',
                variant: 'success'
            })
        );
    }

    handleError(event){
        console.log('FULL ERROR');
        console.log(event.detail);

        alert(JSON.stringify(event.detail));
    }
}