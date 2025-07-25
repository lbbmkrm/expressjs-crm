import customerService from "../services/customer.service.js";

const customerController = {
  index: async (req, res, next) => {
    try {
      const customers = await customerService.getAllCustomers();
      const message =
        customers.length === 0
          ? "No customers found"
          : "Customers retrieved successfully";
      res.status(200).json({
        status: "success",
        message: message,
        data: customers,
      });
    } catch (err) {
      next(err);
    }
  },
  show: async (req, res, next) => {
    try {
      const customerId = parseInt(req.params.id);
      const customer = await customerService.getCustomer(customerId);
      res.status(200).json({
        status: "success",
        message: "Customer retrieved successfully",
        data: customer,
      });
    } catch (err) {
      next(err);
    }
  },
  create: async (req, res, next) => {
    try {
      const customer = await customerService.createCustomer(
        req.user.id,
        req.body
      );
      res.status(201).json({
        status: "success",
        message: "Customer created successfully",
        data: customer,
      });
    } catch (err) {
      next(err);
    }
  },
  update: async (req, res, next) => {
    try {
      const customerId = parseInt(req.params.id);
      const customer = await customerService.updateCustomer(
        customerId,
        req.body
      );
      res.status(200).json({
        status: "success",
        message: "Customer updated successfully",
        data: customer,
      });
    } catch (err) {
      next(err);
    }
  },
  destroy: async (req, res, next) => {
    try {
      const customerId = parseInt(req.params.id);
      await customerService.deleteCustomer(customerId);
      res.status(200).json({
        status: "success",
        message: "Customer deleted successfully",
      });
    } catch (err) {
      next(err);
    }
  },
};

export default customerController;
