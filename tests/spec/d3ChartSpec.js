define(["company"], function (company) {
    describe("Company view", function() {
      it("test namespaces", function () {

        expect(company.d3).not.toBeUndefined();
        expect(company.chartparams).not.toBeUndefined();

      });
    });
});
