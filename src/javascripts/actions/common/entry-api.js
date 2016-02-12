'use strict';

import request from 'superagent';
import Constant from 'constants/common/constant';

const api = {
  EntryAPI: {
    fetch() {
      request
        .get(Constant.ENTRY_ENDPOINT)
        .end(this.EntryAPI._fetched.bind(this));
    },

    _fetched(err, res) {
      if (err) throw err;

      this.update({
        entries: JSON.parse(res.text)
      });
    }
  }
};

export default api;
