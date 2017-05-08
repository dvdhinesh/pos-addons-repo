/*
    POS Kitchen Ticket for Odoo
    Copyright (C) 2016 Dhinesh D <dvdhinesh.mail@gmail.com>
    @author: Dhinesh D <dvdhinesh.mail@gmail.com>
    The licence is in the file __openerp__.py
*/


openerp.pos_kitchen_ticket = function (instance) {
	var module   = instance.point_of_sale;
    var _t = instance.web._t,
        _lt = instance.web._lt;
    var QWeb = instance.web.qweb;


    module.KitchenTicketScreenWidget = module.ScreenWidget.extend({
        template: 'KitchenTicketScreenWidget',

        show_numpad:     false,
        show_leftpane:   false,

        show: function(){
            this._super();
            var self = this;

            var print_button = this.add_action_button({
                    label: _t('Print'),
                    icon: '/point_of_sale/static/src/img/icons/png48/printer.png',
                    click: function(){ self.print(); },
                });

            var finish_button = this.add_action_button({
                    label: _t('Next Order'),
                    icon: '/point_of_sale/static/src/img/icons/png48/go-next.png',
                    click: function() { self.finishOrder(); },
                });

            var payment_button = this.add_action_button({
                    label: _t('Payment'),
                    icon: '/point_of_sale/static/src/img/icons/png48/invoice.png',
                    click: function() { self.payOrder(); },
                });

            this.refresh();

            if (!this.pos.get('selectedOrder')._printed) {
                this.print();
            }

            finish_button.set_disabled(true);
            setTimeout(function(){
                finish_button.set_disabled(false);
            }, 2000);
        },
        print: function() {
            this.pos.get('selectedOrder')._printed = true;
            window.print();
        },
        finishOrder: function() {
            this.pos.get('selectedOrder').destroy();
        },
        payOrder: function() {
            this.pos_widget.screen_selector.set_current_screen('payment');
        },
        refresh: function() {
            var order = this.pos.get('selectedOrder');
            $('.pos-receipt-container', this.$el).html(QWeb.render('KitchenTicket',{
                    widget:this,
                    order: order,
                    orderlines: order.get('orderLines').models,
                }));
        },
        close: function(){
            this._super();
        }
    });

    module.PosWidget.include({
        build_widgets: function(){
            var self = this;
            this._super();

            this.kitchen_ticket_screen = new module.KitchenTicketScreenWidget(this,{});
            this.kitchen_ticket_screen.appendTo(this.$('.screens'));
            this.screen_selector.add_screen('kitchenticket',this.kitchen_ticket_screen);

            var kitchen_ticket_button = $(QWeb.render('KitchenTicketButton'));

            kitchen_ticket_button.click(function(){
                if(self.pos.get('selectedOrder').get('orderLines').models.length > 0){
                    self.pos_widget.screen_selector.set_current_screen('kitchenticket');
                }
            });

            kitchen_ticket_button.appendTo(this.$('.control-buttons'));
            this.$('.control-buttons').removeClass('oe_hidden');
        },
    });

};
