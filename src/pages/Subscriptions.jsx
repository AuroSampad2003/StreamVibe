import Plan from '../components/Plan';
import PlanFeatures from '../components/PlanFeatures';

function Subscriptions() {
  return (
    <div className="text-white min-h-screen">
      <div id="plans">
        <Plan />
      </div>
      <div id="features">
        <PlanFeatures />
      </div>
    </div>
  );
}

export default Subscriptions;
