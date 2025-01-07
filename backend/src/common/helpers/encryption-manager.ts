import * as bcrypt from 'bcrypt';
import { Service } from 'typedi';

@Service()
class EncryptionManager {
  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

}
export default EncryptionManager; 