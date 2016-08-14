var expect = require('chai').expect;

var mk = require('../lib/mk');

describe('mk', function() {
	describe('#isInteresting()', function() {
		it('should match SA and DSA titles', function() {
			expect(mk.isInteresting('[US-MO] [H] Winkeyless.kr b.mini, red alu RS68, 1976 SA [W] PayPal')).to.be.true;
			expect(mk.isInteresting('[US-OH] [H] DSA "Think Different" set, MX Evil Silence Clear Red Unmasked [W] PayPal')).to.be.true;
		});
		it('should not match irrelevant titles', function() {
			expect(mk.isInteresting('[US-WI] [H] 104u White Realforce 45g [W] Paypal')).to.be.false;
			expect(mk.isInteresting('[EU-UK] [H] PayPal [W] cheap gat. black keyboard/switches, alps compatible PCB')).to.be.false;
			expect(mk.isInteresting('[EU-UK] [H] PayPal [W] Custom 60% or TKL')).to.be.false;
			expect(mk.isInteresting('[EU-DE] [H] PayPal / SEPA [W] Granite Round 1 International Kit (DE; Blue Alt Gr Layer)')).to.be.false;
			expect(mk.isInteresting('[US-MD] [H] Pok3r with MX Clears and White LEDs [W] PayPal')).to.be.false;
			expect(mk.isInteresting('[US-MA][H]RC-930 45g RGB Topre Clone [W] Paypal')).to.be.false;
			expect(mk.isInteresting('[US-CA] [H] Paypal [W] Cheapo Blank 2u and 1u Caps')).to.be.false;
			expect(mk.isInteresting('[MY][H] Redscarf RS68 w/ Gateron Linear 55g [W] Paypal')).to.be.false;
			expect(mk.isInteresting('[US-NY][H] Verified PayPal [W] Pok3r III RGB & Programmable Mech Keypad')).to.be.false;
			expect(mk.isInteresting('[US-TX] [H] $170 Paypal [W] HHKB Pro 2 Boards')).to.be.false;
			expect(mk.isInteresting('[US-TN][H] Artisans [W]PayPal')).to.be.false;
			expect(mk.isInteresting('[EU-NL] [H] Artisans [W] Artisans')).to.be.false;
			expect(mk.isInteresting('[US-VA] [H] PayPal [W] 1.25u row 3 blue PuLSE keys')).to.be.false;
			expect(mk.isInteresting('[US-NC][H] CM Storm Quickfire Stealth w/ MX Browns [W] PayPal, Cash')).to.be.false;
			expect(mk.isInteresting('[US-KS] [H] PayPal [W] ~250 Cherry MX Blues')).to.be.false;
			expect(mk.isInteresting('[US-FL] [H] PayPal [W] Deep Space')).to.be.false;
			expect(mk.isInteresting('[US-CA] [H] SP Grab Bag, Mini Van44 Prototype + DCS Vomit + Gatereon Clears, Lubed Apple Ergonomic Adjustable Alps Keyboard, HKP Raven [W] Trades')).to.be.false;
			expect(mk.isInteresting('[EU-UK][H] Paypal [W] Cheap Clicky Full Size UK-ISO Keyboard')).to.be.false;
			expect(mk.isInteresting('[EU-SE] [H] HHKB Limited Edition Esc/Ctrl keys, EnjoyPBT Grey/Dark keyset [W] PayPal, Bank transfer')).to.be.false;
			expect(mk.isInteresting('[EU-UK] [H] Brocaps / HKP / Suited up Artisans [W] Paypal')).to.be.false;
			expect(mk.isInteresting('[US-TX] [H]PayPal [W]Apple IIgs keyboard (658-4081, SKCM Orange), AEK keycaps - Esc, numrow 4')).to.be.false;
			expect(mk.isInteresting('[EU-FR] [H] Artisans [W] PayPal')).to.be.false;
			expect(mk.isInteresting('[US-TN] [H] EnjoyPBT 75% set gray, Originative CMYW, ducky mini browns [W] Paypal')).to.be.false;
		});
	});
});