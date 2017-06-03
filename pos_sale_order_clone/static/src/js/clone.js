/*
    POS Sale Order Clone for Odoo
    Copyright 2017 Dhinesh D <dvdhinesh.mail@gmail.com>
    @author: Dhinesh D <dvdhinesh.mail@gmail.com>
    License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl.html).
*/

odoo.define('pos_sale_order_clone.clone', function (require) {
"use strict";

var Model = require('web.Model');
var core = require('web.core');
var screens = require('point_of_sale.screens');

var _t = core._t;

var CloneButton = screens.ActionButtonWidget.extend({
    template: 'CloneButton',
    button_click: function(){
        var self = this;
        this.gui.show_popup('cloneorder',{
            'title': 'Enter order number!',
            'value': 0,
            'confirm': function(val) {
                self.process_clone(val);
            },
        });
    },
    process_clone: function(order_number){
        var self = this;
        self.search_order(order_number).then(function(order){
            var sale_order = order[0];
            if (! sale_order){
                self.gui.show_popup('error',{
                    'title': _t('Order not found!'),
                    'body':  _t('Entered SO number is not matched with any orders...'),
                    });
                return;
            }
            var client = self.pos.db.get_partner_by_id(sale_order.partner_id[0]);
            self.pos.get('selectedOrder').set_client(client);
            self.clone_sale_order(sale_order.id);
        });
    },
    search_order: function(order_number){
        return new Model('pos.order').query(['partner_id']).filter([['name','=',order_number]]).all();
    },
    clone_sale_order: function(order_id){
        var self = this;
        self.search_order_lines(order_id).then(function(lines){
            var current_order = self.pos.get('selectedOrder');
            $.each(lines, function(i, line){
                var product = self.pos.db.get_product_by_id(line.product_id[0]);
                var options = {
                    'quantity':line.qty,
                    //uncomment: if you want the price from SO, not from the product
                    //'price':line.price_subtotal
                };
                current_order.add_product(product, options);
                if (line.discount)
                    current_order.get_selected_orderline().set_discount(line.discount);
            });
        });
    },
    search_order_lines: function(order_id){
        return new Model('pos.order.line').query(['product_id',
                        'qty','discount','price_subtotal']).filter([['order_id','=',order_id]]).all();
    },
});

screens.define_action_button({
    'name': 'clone',
    'widget': CloneButton,
    'condition': function(){
        return this.pos.config.iface_clone;
    },
});

return CloneButton;

});
