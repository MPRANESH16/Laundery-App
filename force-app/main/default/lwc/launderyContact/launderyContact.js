import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class LaunderyContact extends LightningElement {

    handleSuccess(event){
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'Laundery Contact created',
                variant: 'success'
            })
        );
    }
}