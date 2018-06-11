import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { Headers, Http, URLSearchParams } from '@angular/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit {
  @ViewChild('preloader') preloader: ElementRef;
  public window_name: string = 'Authorization';
  public signedin: number = 0;
  private api: string = 'http://localhost:3000/rx';
  private _account: string = '0x65bc2bc63e956628db7c91f1ba3b995bf255d291' || null;
  private _priv: string = '9d2b7370eeb5b58232bcec6d26d1c2c4ed3714642aa19b3de841e5013e932dd0' || null;
  private _balance: string = '0';
  private _mnemonic: string = null;
  private new_wallet: any = null;
  private tx = {
  	_priv: null,
  	to: null,
  	gasp: null,
  	gasl: null,
  	amount: null,
  	message: null
  };

  constructor(private http: Http, private elementRef: ElementRef) {
  	this.signedin = parseInt(localStorage.getItem('signedin'));
  	this._balance = localStorage.getItem('balance') || '0';
  	if(this.signedin) this.window_name = 'Your wallet';
  }

  ngAfterViewInit() {
  	  this.preloader.nativeElement.style.display = 'block';
  	  this.check_balance();
  }

  send_tx(): any {
  	if(!this.tx.to) return null;
	this.preloader.nativeElement.style.display = 'block';
  	this.tx._priv = this._priv;
  	this.post('send_tx', this.tx)
  	.then(res => {
  	  	this.preloader.nativeElement.style.display = 'none';
  		if(res.status == 'ok') {
		  	this.tx.to = null;
			this.tx.gasp = null;
			this.tx.gasl = null;
			this.tx.amount = null;
			this.tx.message = res.message;
  		}
  	});
  }

  enter(): void {
  	this.preloader.nativeElement.style.display = 'block';
  	this.post('enter', {_priv: this._priv})
  	.then(res => {
  	  	this.preloader.nativeElement.style.display = 'none';
  		if(res.status == 'ok') {
  			this.window_name = 'Your wallet';
  			this._balance = res.balance;
  			this._account = res.account;
  			this.signedin = 1;
  			localStorage.setItem('signedin', '1');
  			localStorage.setItem('balance', this._balance.toString());
  			localStorage.setItem('account', this._account);
  			localStorage.setItem('priv', this._priv);
  		}
  	});
  }

  create(): void {
  	this.preloader.nativeElement.style.display = 'block';
  	this.post('create_wallet', {_mnemonic: this._mnemonic})
  	.then(res => {
  	  	this.preloader.nativeElement.style.display = 'none';
  		if(res.status == 'ok') {
  			this.new_wallet = res;
  			this.window_name = 'Your wallet';
  			this._balance = '0';
  			this._account = res.address;
  			this._priv = res.privateKey;
  			localStorage.setItem('signedin', '1');
  			localStorage.setItem('balance', this._balance.toString());
  			localStorage.setItem('account', this._account);
  			localStorage.setItem('priv', this._priv);
  		}
  	});
  }

  quit(): void {
  	this.signedin = 0;
  	this.window_name = 'Authorization';
  	localStorage.setItem('signedin', '0');
  	localStorage.setItem('balance', null);
	localStorage.setItem('account', null);
	localStorage.setItem('priv', null);
  }

  check_balance(): void {
  	this.post('check_balance', {_account: this._account}).then(res => {
  		if(res.status == 'ok') {
  			this._balance = res.balance.toString();
  			localStorage.setItem('balance', this._balance);
  		}
  	});
  }

  post(action, data): Promise<any> {
    let options = this.getOpts({});
    return this.http.post(`${this.api}/${action}`, data, options)
      .toPromise()
        .then(res => res.json())
          .catch(err => {console.log(err)});
  }

  get(page : number, keyword: string): Promise<any> {
    let options = this.getOpts({p:page, q:keyword});
    return this.http.get(`${this.api}/getMenus`, options)
      .toPromise()
        .then(res => res.json())
          .catch(err => {console.log(err)});
  }

  getOpts(params: any): any {
    let options = { search: new URLSearchParams() };
    for (let key in params) options.search.set(key, params[key] || '');
    return options;
  }

}
