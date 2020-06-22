import * as rax from 'retry-axios';
import axios from 'axios';

rax.attach();

export default class TicketService {
  serviceURL = 'https://front-test.beta.aviasales.ru';

  async getSearchId() {
    const { data } = await axios(`${this.serviceURL}/search`);
    return data.searchId;
  }

  async getDataChunk(searchId) {
    const { data } = await axios(`${this.serviceURL}/tickets?searchId=${searchId}`);
    return data;
  }

  recursiveFetch = async (searchId, onLoadStateUpdate) => {
    try {
      const data = await this.getDataChunk(searchId);
      const chunkData = data.tickets;
      const isStop = data.stop;
      onLoadStateUpdate(chunkData, isStop);
      if (!isStop) {
        await this.recursiveFetch(searchId, onLoadStateUpdate);
      }
    } catch (error) {
      return error;
    }
    return null;
  };
}
