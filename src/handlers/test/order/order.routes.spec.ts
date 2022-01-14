
import supertest from "supertest";
import app from "../../../server";
import * as OrderFn from '../../order/order';
import * as Auth from '../../../authentication/authentication';
import { Status } from "../../../models/order";
describe("Order Routes", () => {

    it('should return succeffully with the user order', async () => {
        spyOn(OrderFn, 'getUserOrder').and.returnValue(Promise.resolve({
           id: 2,
           status: Status.ACTIVE,
           user_id: 1
        }));
        spyOn(Auth, 'verifyToken').and.returnValue(Promise.resolve({
            decoded: {},
            err: false
        }));
        await supertest(app).get('/api/order/1').set('authorization', '8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A').expect(200);
    });
    it('should return with status 401 if the token was expired', async () => {
        spyOn(Auth, 'verifyToken').and.returnValue(Promise.resolve({
            decoded: {},
            err: true
        }));
        await supertest(app).get('/api/order/1').set('authorization', '8MR2OYZtx9OzfBNgpgfl1k699iB1QznFuT-pFt17i1A').expect(401);
    });
})