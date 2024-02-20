import React from "react";
import Layout from "../../Layout/Layout";

const Home = () => {
  return (
    <>
      <Layout />

      <div className="main">
        <h1>Home</h1>


        <fieldset class="usa-fieldset">
          {/* <legend class="usa-legend">Date of Birth</legend> */}
          <span class="usa-hint" id="mdHint">
            For example: January 19 2000
          </span>
          <div class="usa-memorable-date">
            <div class="usa-form-group usa-form-group--month usa-form-group--select">
              <label class="usa-label" for="date_of_birth_month">
                Month
              </label>
              <select
                class="usa-select"
                id="date_of_birth_month"
                name="date_of_birth_month"
                aria-describedby="mdHint"
              >
                <option value>- Select -</option>
                <option value="1">01 - January</option>
                <option value="2">02 - February</option>
                <option value="3">03 - March</option>
                <option value="4">04 - April</option>
                <option value="5">05 - May</option>
                <option value="6">06 - June</option>
                <option value="7">07 - July</option>
                <option value="8">08 - August</option>
                <option value="9">09 - September</option>
                <option value="10">10 - October</option>
                <option value="11">11 - November</option>
                <option value="12">12 - December</option>
              </select>
            </div>
            <div class="usa-form-group usa-form-group--day">
              <label class="usa-label" for="date_of_birth_day">
                Day
              </label>
              <input
                class="usa-input"
                aria-describedby="mdHint"
                id="date_of_birth_day"
                name="date_of_birth_day"
                maxlength="2"
                pattern="[0-9]*"
                inputmode="numeric"
                value=""
              />
            </div>
            <div class="usa-form-group usa-form-group--year">
              <label class="usa-label" for="date_of_birth_year">
                Year
              </label>
              <input
                class="usa-input"
                aria-describedby="mdHint"
                id="date_of_birth_year"
                name="date_of_birth_year"
                minlength="4"
                maxlength="4"
                pattern="[0-9]*"
                inputmode="numeric"
                value=""
              />
            </div>
          </div>
        </fieldset>

        <label class="usa-label" for="fruit">Select a fruit</label>
<div class="usa-combo-box">
  <select class="usa-select" name="fruit" id="fruit">
    <option value>Select a fruit</option>
    <option value="apple">Apple</option>
    <option value="apricot">Apricot</option>
    <option value="avocado">Avocado</option>
    <option value="banana">Banana</option>
    <option value="blackberry">Blackberry</option>
    <option value="blood orange">Blood orange</option>
    <option value="blueberry">Blueberry</option>
    <option value="boysenberry">Boysenberry</option>
    <option value="breadfruit">Breadfruit</option>
    <option value="buddhas hand citron">Buddha's hand citron</option>
    <option value="cantaloupe">Cantaloupe</option>
    <option value="clementine">Clementine</option>
    <option value="crab apple">Crab apple</option>
    <option value="currant">Currant</option>
    <option value="cherry">Cherry</option>
    <option value="custard apple">Custard apple</option>
    <option value="coconut">Coconut</option>
    <option value="cranberry">Cranberry</option>
    <option value="date">Date</option>
    <option value="dragonfruit">Dragonfruit</option>
    <option value="durian">Durian</option>
    <option value="elderberry">Elderberry</option>
    <option value="fig">Fig</option>
    <option value="gooseberry">Gooseberry</option>
    <option value="grape">Grape</option>
    <option value="grapefruit">Grapefruit</option>
    <option value="guava">Guava</option>
    <option value="honeydew melon">Honeydew melon</option>
    <option value="jackfruit">Jackfruit</option>
    <option value="kiwifruit">Kiwifruit</option>
    <option value="kumquat">Kumquat</option>
    <option value="lemon">Lemon</option>
    <option value="lime">Lime</option>
    <option value="lychee">Lychee</option>
    <option value="mandarine">Mandarine</option>
    <option value="mango">Mango</option>
    <option value="mangosteen">Mangosteen</option>
    <option value="marionberry">Marionberry</option>
    <option value="nectarine">Nectarine</option>
    <option value="orange">Orange</option>
    <option value="papaya">Papaya</option>
    <option value="passionfruit">Passionfruit</option>
    <option value="peach">Peach</option>
    <option value="pear">Pear</option>
    <option value="persimmon">Persimmon</option>
    <option value="plantain">Plantain</option>
    <option value="plum">Plum</option>
    <option value="pineapple">Pineapple</option>
    <option value="pluot">Pluot</option>
    <option value="pomegranate">Pomegranate</option>
    <option value="pomelo">Pomelo</option>
    <option value="quince">Quince</option>
    <option value="raspberry">Raspberry</option>
    <option value="rambutan">Rambutan</option>
    <option value="soursop">Soursop</option>
    <option value="starfruit">Starfruit</option>
    <option value="strawberry">Strawberry</option>
    <option value="tamarind">Tamarind</option>
    <option value="tangelo">Tangelo</option>
    <option value="tangerine">Tangerine</option>
    <option value="ugli fruit">Ugli fruit</option>
    <option value="watermelon">Watermelon</option>
    <option value="white currant">White currant</option>
    <option value="yuzu">Yuzu</option>
  </select>
</div>
      </div>
    </>
  );
};

export default Home;
