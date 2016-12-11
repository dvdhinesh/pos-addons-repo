.. image:: https://img.shields.io/badge/licence-AGPL--3-blue.svg
    :alt: License: AGPL-3

Kitchen Ticket for Odoo Point of Sale
=====================================

This module allows to print a kitchen ticket, which is the same ticket than normal
but without prices and taxes. This will be useful when the order is done internally
without the payment.

It has a additional **Payment** button on the Kitchen Ticket window to change the
flow from **Payment->Receipt** to **Receipt->Payment**.

This module target the POSBoxless environments, as the POSBox environment already 
have a Bill printing method which can be enabled with pos_restaurant module that 
Odoo provides.

Usage
=====

Just press the *Kitchen Ticket* button that appears below the order


Installation
============

Nothing special is needed to install this module.


Configuration
=============

No configuration needed.


Known issues / Roadmap
======================

Missing features
----------------
* Not tested with a **PosBox setting** so surely will not work if *'print by
proxy'* is enabled.


Credits
=======

Contributors
------------

* Dhinesh D <dvdhinesh.mail@gmail.com>


Maintainer
----------

* Dhinesh D <dvdhinesh.mail@gmail.com>
