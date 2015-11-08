class AliasesController < ApplicationController

  # GET /aliases
  # GET /aliases.json
  def index

  end

  # GET /aliases/:user_level
  # GET /aliases/:user_level.json
  def show
    aliases = Alias.all
    aliases.to_a.sort!
    unless params[:alias].nil?
      @aliases = aliases
      return
    end
    render :partial => 'aliases', :object => aliases
  end

  # GET /aliases/new
  def new
  end

  # GET /aliases/1/edit
  def edit
  end

  # POST /aliases
  # POST /aliases.json
  def create

  end

  # PATCH/PUT /aliases/1
  # PATCH/PUT /aliases/1.json
  def update

  end

  # DELETE /aliases/1
  # DELETE /aliases/1.json
  def destroy

  end

end
