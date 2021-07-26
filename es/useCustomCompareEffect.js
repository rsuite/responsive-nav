import { useEffect, useRef } from 'react';

var useCustomCompareEffect = function useCustomCompareEffect(effect, deps, depsEqual) {
  var ref = useRef(undefined);

  if (!ref.current || !depsEqual(deps, ref.current)) {
    ref.current = deps;
  } // eslint-disable-next-line react-hooks/exhaustive-deps


  useEffect(effect, ref.current);
};

export default useCustomCompareEffect;