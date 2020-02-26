// @ts-ignore
// tslint:disable-next-line:no-submodule-imports
import waterfall from 'async/waterfall';
import { CallBack, IHook } from './IHook';
export default class SyncWaterfallHook implements IHook {
  private tasks: any[];
  constructor(...args: any[]) {
    this.tasks = [];
  }

  public call(...args: any[]): void {
    return waterfall(this.tasks);
  }
  public tap(name: string, cb: CallBack) {
    if (this.tasks.length === 0) {
      this.tasks.push((callback: any) => {
        const value = cb();
        callback(value ? null : false, value);
      });
    } else {
      this.tasks.push((arg: any, callback: any) => {
        const value = cb();
        callback(value ? null : false, name);
      });
    }
  }
}
