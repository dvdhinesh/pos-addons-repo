# -*- coding: utf-8 -*-
# Copyright 2017 Dhinesh D <dvdhinesh.mail@gmail.com>
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl.html).
{

    'name': 'POS Sale Order Clone',
    "summary": "Allow POS users to clone the POS SO using order number.",
    'version': '10.0.1.0.0',
    'author': "Dhinesh D <dvdhinesh.mail@gmail.com>",
    'category': 'Point of Sale',
    'depends': [
        'point_of_sale',
    ],
    "license": "LGPL-3",
    "data": [
        'views/pos_config_view.xml',
        'views/pos_sale_order_clone_template.xml',
    ],
    'qweb': [
        'static/src/xml/clone.xml',
        'static/src/xml/pos.xml',
    ],
    'installable': True,
}
