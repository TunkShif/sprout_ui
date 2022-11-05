defmodule SproutUI.ModalTest do
  use ExUnit.Case, async: true
  use Wallaby.Feature

  @endpoint "/modal"

  def opening_modals() do
    Query.css("[data-part=modal][data-ui-state=open]")
  end

  feature "modals are not open by default", %{session: session} do
    assert session
           |> visit(@endpoint)
           |> all(opening_modals()) == []
  end

  feature "the first modal is open by default", %{session: session} do
    session
    |> visit(@endpoint <> "?default_open=true")
    |> assert_has(opening_modals())
  end

  feature "clicking trigger opens the modal", %{session: session} do
    session
    |> visit(@endpoint)
    |> click(Query.css("button", text: "Edit"))
    |> assert_has(Query.css("#modal-2[data-ui-state=open]"))
  end

  feature "clicking close button closes the modal", %{session: session} do
    assert session
           |> visit(@endpoint <> "?default_open=true")
           |> click(Query.css("#modal-0 button"))
           |> all(opening_modals()) == []
  end

  feature "clicking outside the modal closes the modal", %{session: session} do
    assert session
           |> visit(@endpoint <> "?default_open=true")
           |> click(Query.css("body"))
           |> all(opening_modals()) == []
  end

  # feature "focusing on the first element after opening the modal", %{session: session} do
  #   assert session
  #          |> visit(@endpoint)
  #          |> click(Query.css("button", text: "OPEN"))
  #          |> has_css?(Query.css("button", text: "OK"), "focus:ring-2")
  # end
end
