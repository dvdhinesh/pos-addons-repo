# -*- coding: utf-8 -*-
# Copyright 2017 Dhinesh D <dvdhinesh.mail@gmail.com>
# License LGPL-3.0 or later (http://www.gnu.org/licenses/lgpl.html).

from odoo import fields, models


class PosConfig(models.Model):
    _inherit = 'pos.config'

    iface_clone = fields.Boolean(string='Clone Orders?', help='Allow the cashier to clone the order.')
